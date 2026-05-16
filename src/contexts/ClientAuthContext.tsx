"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  fetchCurrentUser,
  type PublicUser,
} from "@/src/lib/auth/client";
import { performLogout } from "@/src/lib/auth/logout";
import { isClientRole } from "@/src/lib/auth/roles";

type ClientAuthContextValue = {
  user: PublicUser | null;
  isAuthenticated: boolean;
  isReady: boolean;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
};

const ClientAuthContext = createContext<ClientAuthContextValue | null>(null);

export function ClientAuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<PublicUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  const refreshSession = useCallback(async () => {
    const currentUser = await fetchCurrentUser();

    if (currentUser && isClientRole(currentUser.role)) {
      setUser(currentUser);
      return;
    }

    setUser(null);
  }, []);

  useEffect(() => {
    refreshSession().finally(() => setIsReady(true));
  }, [refreshSession]);

  const logout = useCallback(async () => {
    await performLogout("/sign-in?success=signed-out");
    setUser(null);
    router.replace("/sign-in?success=signed-out");
    router.refresh();
  }, [router]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isReady,
      logout,
      refreshSession,
    }),
    [user, isReady, logout, refreshSession],
  );

  return (
    <ClientAuthContext.Provider value={value}>{children}</ClientAuthContext.Provider>
  );
}

export function useClientAuth() {
  const context = useContext(ClientAuthContext);

  if (!context) {
    throw new Error("useClientAuth must be used within ClientAuthProvider");
  }

  return context;
}
