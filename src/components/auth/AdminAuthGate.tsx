"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAdminAuth } from "@/src/contexts/AdminAuthContext";

export default function AdminAuthGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isReady } = useAdminAuth();

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      router.replace("/sign-in");
    }
  }, [isReady, isAuthenticated, router]);

  if (!isReady || !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
