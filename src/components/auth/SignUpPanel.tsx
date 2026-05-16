"use client";

import AuthPanelHeader from "@/src/components/auth/AuthPanelHeader";
import ClientSignUpForm from "@/src/components/auth/ClientSignUpForm";

export default function SignUpPanel() {
  return (
    <div className="w-full max-w-xl space-y-5 sm:space-y-6">
      <AuthPanelHeader />

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Sign Up</h2>
        <p className="text-base text-slate-600 sm:text-lg">Create a client account</p>
      </div>

      <ClientSignUpForm idPrefix="sign-up-panel" />
    </div>
  );
}
