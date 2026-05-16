"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useSessionGuard } from "@/src/hooks/use-session-guard";
import { useClientAuth } from "@/src/contexts/ClientAuthContext";

export default function ClientAuthGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isReady } = useClientAuth();

  useSessionGuard("client");

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      router.replace("/sign-in?next=/client");
    }
  }, [isReady, isAuthenticated, router]);

  if (!isReady || !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
