"use client";

import AuthPanelHeader from "@/src/components/auth/AuthPanelHeader";
import ClientSignInForm from "@/src/components/auth/ClientSignInForm";

export default function SignInPanel() {
  return (
    <div className="w-full max-w-xl space-y-5 sm:space-y-6">
      <AuthPanelHeader />

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">Log In</h2>
        <p className="text-base text-slate-600 sm:text-lg">Log in to your account</p>
      </div>

      <ClientSignInForm idPrefix="sign-in-panel" />
    </div>
  );
}
