import { apiFetch, setAccessToken } from "@/src/lib/api-client";
import { signOut as nextAuthSignOut } from "next-auth/react";
import { CheckEmailResponse, Login } from "../auth.types";

export const AuthService = {
  checkEmail(email: string): Promise<CheckEmailResponse> {
    return apiFetch<CheckEmailResponse>(
      `/api/user/check-email?email=${encodeURIComponent(email)}`,
    );
  },
  login(email: string | null, password: string): Promise<Login> {
    return apiFetch<Login>(`/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },
  async logout() {
    try {
      return apiFetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Backend logout cleanup omitted or failed", error);
    } finally {
      setAccessToken(null);

      await nextAuthSignOut({
        callbackUrl: "/lookup",
        redirect: true,
      });
    }
  },
};
