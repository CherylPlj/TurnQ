"use client";

import { useEffect, useMemo, useState } from "react";
import { useAdminSystemSettings } from "@/src/contexts/AdminSystemSettingsContext";
import {
  formatAdminDate,
  formatAdminTime,
} from "@/src/lib/admin-system-settings";

export function useLiveDateTime() {
  const { settings } = useAdminSystemSettings();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  return useMemo(
    () => ({
      date: formatAdminDate(now, settings),
      time: formatAdminTime(now, settings),
    }),
    [now, settings],
  );
}
