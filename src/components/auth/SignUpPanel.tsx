"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent } from "react";
import AuthPanelHeader from "@/src/components/auth/AuthPanelHeader";

export default function SignUpPanel() {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/sign-in");
  }

  return (
    <div className="w-full max-w-xl space-y-5 sm:space-y-6">
      <AuthPanelHeader />

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Sign Up</h2>
        <p className="text-base text-slate-600 sm:text-lg">Create an account</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="sign-up-email" className="text-sm font-semibold text-slate-700">
            Enter email *
          </label>
          <input
            id="sign-up-email"
            type="email"
            placeholder="sam@gmail.com"
            className="w-full rounded-full border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-indigo-200 transition focus:ring-2"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="sign-up-password" className="text-sm font-semibold text-slate-700">
            Enter password *
          </label>
          <input
            id="sign-up-password"
            type="password"
            placeholder="********"
            className="w-full rounded-full border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-indigo-200 transition focus:ring-2"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="sign-up-confirm-password"
            className="text-sm font-semibold text-slate-700"
          >
            Confirm password *
          </label>
          <input
            id="sign-up-confirm-password"
            type="password"
            placeholder="********"
            className="w-full rounded-full border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-indigo-200 transition focus:ring-2"
          />
        </div>

        <label className="flex items-center gap-3 text-sm text-slate-600">
          <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
          I agree with the terms and conditions.
        </label>

        <button
          type="submit"
          className="w-full rounded-full bg-[#4f46e5] py-3 text-base font-semibold text-white transition hover:bg-[#4338ca]"
        >
          Sign Up
        </button>
      </form>

      <p className="text-center text-base text-slate-600">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-bold text-[#4f46e5] hover:text-[#4338ca]">
          Log In.
        </Link>
      </p>
    </div>
  );
}
