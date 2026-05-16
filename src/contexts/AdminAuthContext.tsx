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

const AUTH_STORAGE_KEY = "turnq-admin-authenticated";

type AdminAuthContextValue = {
  isAuthenticated: boolean;
  isReady: boolean;
  logout: () => void;
  login: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

function readStoredAuth(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return sessionStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = readStoredAuth();
    setIsAuthenticated(stored);
    setIsReady(true);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    router.push("/");
  }, [router]);

  const login = useCallback(() => {
    sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
    setIsAuthenticated(true);
    router.push("/admin");
  }, [router]);

  const value = useMemo(
    () => ({
      isAuthenticated,
      isReady,
      logout,
      login,
    }),
    [isAuthenticated, isReady, logout, login],
  );

  return (
    <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }

  return context;
}
