import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

interface AuthResponse {
  id: string;
  accessToken: string;
  email: string;
  role: string;
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            },
          );

          if (!res.ok) return null;

          const data: AuthResponse = await res.json();
          if (data && data.accessToken) {
            return {
              id: data.email,
              email: data.email,
              role: data.role,
              accessToken: data.accessToken,
            };
          }
          return null;
        } catch (error) {
          console.error("Manual login validation error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/lookup",
    error: "/lookup",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return true;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/social`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              firstName: user.name?.split(" ")[0] || "",
              lastName: user.name?.split(" ")[1] || "",
              provider: "google",
            }),
          },
        );

        if (!res.ok) return false;

        const data: AuthResponse = await res.json();

        // Temporarily attach the backend's access token to the user object
        // so the 'jwt' callback can intercept it next.
        user.accessToken = data.accessToken;

        return true;
      } catch (error) {
        console.error("Failed to sync social login with .NET backend", error);
        return false;
      }
    },

    // Push the backend token into NextAuth's encrypted cookie state
    async jwt({ token, user }) {
      if (user && user.accessToken) {
        token.accessToken = user.accessToken;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
});
