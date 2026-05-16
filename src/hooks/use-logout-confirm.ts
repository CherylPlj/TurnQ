"use client";

import { useCallback, useState } from "react";

export function useLogoutConfirm(logout: () => Promise<void>) {
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const requestLogout = useCallback(() => {
    setOpen(true);
  }, []);

  const cancelLogout = useCallback(() => {
    if (isLoggingOut) {
      return;
    }
    setOpen(false);
  }, [isLoggingOut]);

  const confirmLogout = useCallback(async () => {
    setIsLoggingOut(true);

    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
      setOpen(false);
    }
  }, [logout]);

  return {
    open,
    isLoggingOut,
    requestLogout,
    cancelLogout,
    confirmLogout,
  };
}
