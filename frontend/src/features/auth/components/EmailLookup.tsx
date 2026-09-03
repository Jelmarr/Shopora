"use client";

import { getErrorMessage } from "@/lib/error-handler";
import { EMAIL_REGEX } from "@/lib/utils/email";
import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";
import SocialLinks from "./SocialLinks";
import { useRouter } from "next/navigation";
import { AuthService } from "../services/auth.services";
import SubmitButton from "./ui/SubmitButton";

const EmailLookup = () => {
  const [email, setEmail] = useState("");

  const [emailError, setEmailError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [emailLoading, setEmailLoading] = useState(false);

  const router = useRouter();

  const checkEmail = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setServerError(null);
    setEmailError(null);
    setEmailLoading(true);

    if (!email || !EMAIL_REGEX.test(email)) {
      setEmailError("Invalid email address");
      setEmailLoading(false);
      return;
    }

    try {
      const data = await AuthService.checkEmail(email);

      if (data.isExisting) {
        router.push(`/login?email=${encodeURIComponent(data.email)}`);
        return;
      }
      router.push(`/signup?email=${encodeURIComponent(data.email)}`);
    } catch (err) {
      setServerError(getErrorMessage(err));
    }
  };

  return (
    <>
      {serverError && (
        <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg text-sm font-medium text-rose-600">
          {serverError}
        </div>
      )}

      <form className="flex flex-col gap-4" onSubmit={checkEmail}>
        <div>
          <div className="bg-white rounded-lg w-full group">
            <div className="relative bg-inherit">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                id="email"
                name="email"
                className={`peer h-10 w-full bg-transparent rounded-lg text-black placeholder-transparent ring-1 px-2 group-hover:ring-gray-900 select-none ${emailError ? "ring-red-400 " : "ring-gray-400"}`}
                placeholder="Email address"
              />
              <label
                htmlFor="email"
                className="absolute cursor-text select-none left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3  peer-focus:text-sm transition-all"
              >
                Email address
              </label>
            </div>
          </div>
          {emailError && (
            <div className="text-sm text-red-500 font-medium flex items-center gap-2 mt-2">
              <AlertCircleIcon size={15} /> {emailError}
            </div>
          )}
        </div>

        <SubmitButton
          disabled={emailLoading || email.length === 0}
          loadingLabel="Confirming..."
          isLoading={emailLoading}
          type="submit"
          name="Continue with email"
        />
      </form>

      <SocialLinks />
    </>
  );
};

export default EmailLookup;
