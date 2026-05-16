"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  AUTH_SUCCESS,
  type AuthSuccessType,
} from "@/src/lib/auth/messages";

const AUTO_DISMISS_MS = 6000;

function resolveMessage(success: string, pathname: string): string | null {
  if (success === "signed-up") {
    return AUTH_SUCCESS.signedUp;
  }

  if (success === "signed-in") {
    return pathname.startsWith("/admin")
      ? AUTH_SUCCESS.signedInAdmin
      : AUTH_SUCCESS.signedIn;
  }

  if (success === "signed-out") {
    return AUTH_SUCCESS.signedOut;
  }

  if (success in AUTH_SUCCESS) {
    return AUTH_SUCCESS[success as AuthSuccessType];
  }

  return null;
}

function AuthSuccessBannerContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!success) {
      setVisible(false);
      setMessage(null);
      return;
    }

    const text = resolveMessage(success, pathname);

    if (!text) {
      return;
    }

    setMessage(text);
    setVisible(true);

    const timer = window.setTimeout(() => {
      setVisible(false);
      clearSuccessFromUrl();
    }, AUTO_DISMISS_MS);

    return () => window.clearTimeout(timer);
  }, [success, pathname]);

  function clearSuccessFromUrl() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("success");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }

  function handleDismiss() {
    setVisible(false);
    clearSuccessFromUrl();
  }

  if (!visible || !message) {
    return null;
  }

  return (
    <div
      className="mb-4 flex items-start justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 shadow-sm"
      role="status"
      aria-live="polite"
    >
      <p>{message}</p>
      <button
        type="button"
        onClick={handleDismiss}
        className="shrink-0 rounded-lg px-2 py-0.5 text-emerald-700 transition hover:bg-emerald-100"
        aria-label="Dismiss message"
      >
        ×
      </button>
    </div>
  );
}

export default function AuthSuccessBanner() {
  return (
    <Suspense fallback={null}>
      <AuthSuccessBannerContent />
    </Suspense>
  );
}
