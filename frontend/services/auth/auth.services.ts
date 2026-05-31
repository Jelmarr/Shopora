import { apiFetch } from "@/lib/api-client";

export interface CheckEmailResponse {
  email: string;
  isExisting: boolean;
}

export const AuthService = {
  checkEmail(email: string) {
    return apiFetch<CheckEmailResponse>(
      `/api/user/check-email?email=${encodeURIComponent(email)}`,
    );
  },
};
