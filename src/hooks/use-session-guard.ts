"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { fetchCurrentUser } from "@/src/lib/auth/client";
import { isAdminRole, isClientRole } from "@/src/lib/auth/roles";

type SessionGuardRole = "client" | "admin";

export function useSessionGuard(expectedRole: SessionGuardRole) {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    async function verifySession(reason: string) {
      const user = await fetchCurrentUser();

      if (cancelled) {
        return;
      }

      const isValid =
        expectedRole === "client"
          ? Boolean(user && isClientRole(user.role))
          : Boolean(user && isAdminRole(user.role));

      if (!isValid) {
        const nextPath = expectedRole === "client" ? "/client" : "/admin";
        router.replace(`/sign-in?next=${encodeURIComponent(nextPath)}`);
        router.refresh();
        return;
      }

      if (process.env.NODE_ENV === "development") {
        console.log(`[session-guard:${expectedRole}] verified (${reason})`);
      }
    }

    void verifySession("mount");

    function handlePageShow(event: PageTransitionEvent) {
      if (event.persisted) {
        void verifySession("bfcache-restore");
      }
    }

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      cancelled = true;
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [expectedRole, router]);
}
