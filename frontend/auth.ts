import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/social`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              provider: "google",
            }),
          },
        );

        console.log("Backend response status:", res.status);
        const body = await res.text();
        console.log("Backend response body:", body);

        return res.ok;
      } catch (error) {
        console.error("Failed to sync social login with .NET backend", error);
        return false;
      }
    },
  },
});
