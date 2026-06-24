"use client";

import { ApiError } from "@/src/lib/api-client";
import { getErrorMessage } from "@/src/lib/error-handler";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthService } from "../services/auth.services";
import { signIn } from "next-auth/react";
import Input from "./ui/Input";
import SubmitButton from "./ui/SubmitButton";
import Card from "./ui/Card";
const Login = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const router = useRouter();

  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    if (!email || email.trim() === "") {
      router.replace("/lookup");
      return;
    }

    let isMounted = true;

    const verifyEmailExistence = async () => {
      try {
        setIsVerifying(true);
        const res = await AuthService.checkEmail(email);

        if (!isMounted) return;

        if (!res.isExisting) {
          router.replace("/lookup");
        } else {
          setIsVerifying(false);
        }
      } catch {
        if (isMounted) {
          router.replace("/lookup");
        }
      }
    };

    verifyEmailExistence();

    return () => {
      isMounted = false;
    };
  }, [email, router]);

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setShowError(null);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setShowError("Invalid email or password.");
      } else {
        router.push("/store/dashboard");
        router.refresh();
      }
    } catch (err) {
      getErrorMessage(err);
      if (err instanceof ApiError) {
        setShowError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!email || isVerifying) {
    return null;
  }

  return (
    <Card>
      <div className="flex flex-col gap-4">
        <div className="mb-4">
          <h3 className="text-2xl font-semibold">Login</h3>
          <p className="text-sm text-gray-500 font-semibold mt-1">
            Continue to shopora account
          </p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div>
            <div className="bg-white rounded-lg w-full group">
              <div className="relative bg-inherit">
                <div
                  className={`peer h-10 w-full bg-gray-100 rounded-lg text-black ring-1 px-4  ring-gray-400 flex items-center mb-6 justify-between`}
                >
                  {email}
                  <Link
                    href="/lookup"
                    className="font-semibold text-sm cursor-pointer underline text-blue-500"
                  >
                    Change
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative">
              <Input
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? "text" : "password"}
                error={showError ?? ""}
              />
              {showPassword ? (
                <EyeOff
                  className="absolute right-4 top-3 cursor-pointer"
                  size={18}
                  color="gray"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  className="absolute right-4 top-3 cursor-pointer"
                  size={18}
                  color="gray"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            <Link
              href="/forgot-password"
              className="text-blue-500 text-sm mt-1 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <SubmitButton
            isLoading={loading}
            disabled={password.length < 8 || loading || !email}
            loadingLabel="Submitting..."
            type="submit"
            name="Log in"
          />
        </form>

        <p className="text-gray-900 text-center text-sm flex items-center gap-2 justify-center">
          New to Shopora?{" "}
          <Link
            href="/lookup"
            className="font-bold text-blue-500 flex items-center gap-2 group hover:text-blue-600"
          >
            Get started{" "}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-all duration-200"
            />
          </Link>
        </p>
      </div>
    </Card>
  );
};

export default Login;
