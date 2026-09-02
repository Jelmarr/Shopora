"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import Link from "next/link";
import { apiFetch } from "@/src/lib/api-client";
import { handleFormError } from "@/src/lib/form-errors";
import { useEffect } from "react";
import Input from "./ui/Input";
import PasswordStrength from "./ui/PasswordStrength";
import SubmitButton from "./ui/SubmitButton";
import Card from "./ui/Card";

interface CreateUserForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Signup = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const router = useRouter();

  const isValidEmail = email && email.trim() !== "";

  useEffect(() => {
    if (!isValidEmail) {
      router.replace("/lookup");
      return;
    }
  }, [email, router, isValidEmail]);

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateUserForm>({
    mode: "onChange",
    defaultValues: {
      email: email || "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  const onSubmit = async (data: CreateUserForm) => {
    try {
      await apiFetch(`/api/user`, {
        method: "POST",
        body: JSON.stringify(data),
      });

      router.push("/store/dashboard");
    } catch (err) {
      handleFormError(err, setError);
    }
  };

  const password = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  if (!isValidEmail) {
    return null;
  }

  return (
    <Card>
      <div
        className={`peer h-14 w-full rounded-lg px-4 bg-neutral-100 flex items-center justify-between`}
      >
        <div>
          <p className="text-xs">Email address</p>
          <p>{email}</p>
        </div>
        <Link
          href="/lookup"
          className="font-semibold text-sm cursor-pointer underline"
        >
          Change
        </Link>
      </div>
      <h3 className="font-medium mt-4 mb-2">Create an account</h3>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4">
          <Input
            error={errors.firstName?.message}
            label="First Name"
            {...register("firstName", {
              required: "First name is required",
            })}
          />
          <Input
            error={errors.lastName?.message}
            label="Last Name"
            {...register("lastName", {
              required: "Last name is required",
            })}
          />
        </div>
        <Input
          error={errors.password?.message}
          label="Password"
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
        />
        <PasswordStrength password={password} />
        <SubmitButton
          disabled={!isValid}
          name="Create account"
          isLoading={isSubmitting}
          loadingLabel="Creating..."
          type="submit"
        />
      </form>
      <p className="text-gray-900 text-center text-sm mt-2">
        Already have a Shopora account?{" "}
        <Link href="/lookup" className="font-semibold underline ">
          Log in
        </Link>
      </p>
    </Card>
  );
};

export default Signup;
