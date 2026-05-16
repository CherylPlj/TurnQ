"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { signIn } from "@/src/lib/auth/client";
import { SIGN_IN_ERRORS } from "@/src/lib/auth/messages";
import { withAuthSuccessParam } from "@/src/lib/auth/redirect";
import { getPostSignInPath } from "@/src/lib/auth/roles";

type ClientSignInFormProps = {
  signUpHref?: string;
  idPrefix?: string;
  nextPath?: string;
  showSignUpLink?: boolean;
};

export default function ClientSignInForm({
  signUpHref = "/sign-up",
  idPrefix = "sign-in",
  nextPath = "/client",
  showSignUpLink = true,
}: ClientSignInFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    if (!email.trim() || !password) {
      setFormError(SIGN_IN_ERRORS.unableToSignIn);
      return;
    }

    setIsSubmitting(true);

    const result = await signIn({ email, password });

    setIsSubmitting(false);

    if ("error" in result) {
      setFormError(result.error);
      return;
    }

    const destination = getPostSignInPath(result.user.role, nextPath);
    router.push(withAuthSuccessParam(destination, "signed-in"));
    router.refresh();
  }

  return (
    <>
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <SignInField
          id={`${idPrefix}-email`}
          label="Enter email *"
          type="email"
          placeholder="sam@gmail.com"
          value={email}
          onChange={setEmail}
          autoComplete="email"
        />

        <SignInField
          id={`${idPrefix}-password`}
          label="Enter password *"
          type="password"
          placeholder="********"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
        />

        <button
          type="button"
          className="text-sm font-medium text-slate-500 transition hover:text-[#4f46e5]"
        >
          Forgot Password?
        </button>

        {formError ? (
          <p
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
            role="alert"
          >
            {formError}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-[#4f46e5] py-3 text-base font-semibold text-white transition hover:bg-[#4338ca] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Signing in..." : "Log In"}
        </button>
      </form>

      {showSignUpLink ? (
        <p className="text-center text-base text-slate-600">
          Don&apos;t have an account?{" "}
          <Link href={signUpHref} className="font-bold text-[#4f46e5] hover:text-[#4338ca]">
            Sign Up.
          </Link>
        </p>
      ) : null}
    </>
  );
}

function SignInField({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  autoComplete,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        className="w-full rounded-full border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-indigo-200 transition focus:ring-2"
      />
    </div>
  );
}
