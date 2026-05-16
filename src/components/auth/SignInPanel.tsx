"use client";

import Link from "next/link";
import { type FormEvent } from "react";
import AuthPanelHeader from "@/src/components/auth/AuthPanelHeader";
import { useAdminAuth } from "@/src/contexts/AdminAuthContext";

export default function SignInPanel() {
  const { login } = useAdminAuth();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    login();
  }

  return (
    <div className="w-full max-w-xl space-y-5 sm:space-y-6">
      <AuthPanelHeader />

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Log In</h2>
        <p className="text-base text-slate-600 sm:text-lg">Log in to your account</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="sign-in-email" className="text-sm font-semibold text-slate-700">
            Enter email *
          </label>
          <input
            id="sign-in-email"
            type="email"
            placeholder="sam@gmail.com"
            className="w-full rounded-full border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-indigo-200 transition focus:ring-2"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="sign-in-password" className="text-sm font-semibold text-slate-700">
            Enter password *
          </label>
          <input
            id="sign-in-password"
            type="password"
            placeholder="********"
            className="w-full rounded-full border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-indigo-200 transition focus:ring-2"
          />
        </div>

        <button
          type="button"
          className="text-sm font-medium text-slate-500 transition hover:text-[#4f46e5]"
        >
          Forgot Password?
        </button>

        <button
          type="submit"
          className="w-full rounded-full bg-[#4f46e5] py-3 text-base font-semibold text-white transition hover:bg-[#4338ca]"
        >
          Log In
        </button>
      </form>

      <p className="text-center text-base text-slate-600">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="font-bold text-[#4f46e5] hover:text-[#4338ca]">
          Sign Up.
        </Link>
      </p>
    </div>
  );
}
