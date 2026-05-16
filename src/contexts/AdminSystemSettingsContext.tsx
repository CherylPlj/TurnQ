"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  DEFAULT_ADMIN_SYSTEM_SETTINGS,
  loadAdminSystemSettings,
  saveAdminSystemSettings,
  type AdminSystemSettings,
} from "@/src/lib/admin-system-settings";

type AdminSystemSettingsContextValue = {
  settings: AdminSystemSettings;
  updateSettings: (updates: Partial<AdminSystemSettings>) => void;
  saveSettings: (settings: AdminSystemSettings) => void;
  isReady: boolean;
};

const AdminSystemSettingsContext =
  createContext<AdminSystemSettingsContextValue | null>(null);

function subscribeToSettings(onStoreChange: () => void) {
  window.addEventListener("turnq-admin-settings-updated", onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener("turnq-admin-settings-updated", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function AdminSystemSettingsProvider({ children }: { children: ReactNode }) {
  const settings = useSyncExternalStore(
    subscribeToSettings,
    loadAdminSystemSettings,
    () => DEFAULT_ADMIN_SYSTEM_SETTINGS,
  );

  const saveSettings = useCallback((next: AdminSystemSettings) => {
    saveAdminSystemSettings(next);
  }, []);

  const updateSettings = useCallback(
    (updates: Partial<AdminSystemSettings>) => {
      saveAdminSystemSettings({ ...settings, ...updates });
    },
    [settings],
  );

  const value = useMemo(
    () => ({
      settings,
      isReady: true,
      updateSettings,
      saveSettings,
    }),
    [saveSettings, settings, updateSettings],
  );

  return (
    <AdminSystemSettingsContext.Provider value={value}>
      {children}
    </AdminSystemSettingsContext.Provider>
  );
}

export function useAdminSystemSettings() {
  const context = useContext(AdminSystemSettingsContext);
  if (!context) {
    throw new Error(
      "useAdminSystemSettings must be used within AdminSystemSettingsProvider",
    );
  }
  return context;
}
