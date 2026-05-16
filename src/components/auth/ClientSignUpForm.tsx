"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import TermsAgreementField from "@/src/components/auth/TermsAgreementField";
import { signUpClient } from "@/src/lib/auth/client";
import { SIGN_UP_ERRORS } from "@/src/lib/auth/messages";
import { withAuthSuccessParam } from "@/src/lib/auth/redirect";

type ClientSignUpFormProps = {
  signInHref?: string;
  idPrefix?: string;
};

export default function ClientSignUpForm({
  signInHref = "/sign-in",
  idPrefix = "sign-up",
}: ClientSignUpFormProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setFieldErrors({});

    if (!agreedToTerms) {
      setFieldErrors({
        agreedToTerms: "You must agree to the Terms and Conditions before creating an account.",
      });
      setFormError(SIGN_UP_ERRORS.validationSummary);
      return;
    }

    setIsSubmitting(true);

    const result = await signUpClient({
      fullName,
      email,
      password,
      confirmPassword,
      agreedToTerms,
    });

    setIsSubmitting(false);

    if ("error" in result) {
      if (result.fieldErrors) {
        setFieldErrors(result.fieldErrors);
      }
      setFormError(result.error);
      return;
    }

    router.push(withAuthSuccessParam("/client", "signed-up"));
    router.refresh();
  }

  return (
    <>
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <SignUpField
          id={`${idPrefix}-full-name`}
          label="Full name *"
          type="text"
          placeholder="Juan Dela Cruz"
          value={fullName}
          onChange={setFullName}
          error={fieldErrors.fullName}
          autoComplete="name"
        />

        <SignUpField
          id={`${idPrefix}-email`}
          label="Enter email *"
          type="email"
          placeholder="sam@gmail.com"
          value={email}
          onChange={setEmail}
          error={fieldErrors.email}
          autoComplete="email"
        />

        <SignUpField
          id={`${idPrefix}-password`}
          label="Enter password *"
          type="password"
          placeholder="********"
          value={password}
          onChange={setPassword}
          error={fieldErrors.password}
          autoComplete="new-password"
        />

        <SignUpField
          id={`${idPrefix}-confirm-password`}
          label="Confirm password *"
          type="password"
          placeholder="********"
          value={confirmPassword}
          onChange={setConfirmPassword}
          error={fieldErrors.confirmPassword}
          autoComplete="new-password"
        />

        <TermsAgreementField
          checkboxId={`${idPrefix}-terms`}
          checked={agreedToTerms}
          onCheckedChange={(checked) => {
            setAgreedToTerms(checked);
            if (checked) {
              setFieldErrors((current) => {
                const next = { ...current };
                delete next.agreedToTerms;
                return next;
              });
            }
          }}
        />
        {fieldErrors.agreedToTerms ? (
          <p className="text-sm font-medium text-red-600">{fieldErrors.agreedToTerms}</p>
        ) : null}

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
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <p className="text-center text-base text-slate-600">
        Already have an account?{" "}
        <Link href={signInHref} className="font-bold text-[#4f46e5] hover:text-[#4338ca]">
          Log In.
        </Link>
      </p>
    </>
  );
}

function SignUpField({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  autoComplete,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
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
        className={`w-full rounded-full border bg-white px-4 py-3 text-base text-slate-900 outline-none ring-indigo-200 transition focus:ring-2 ${
          error ? "border-red-400" : "border-slate-300"
        }`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <p id={`${id}-error`} className="text-sm font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

