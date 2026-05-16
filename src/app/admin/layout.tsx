import type { ReactNode } from "react";
import AdminShell from "@/src/components/admin/AdminShell";
import { AdminAuthProvider } from "@/src/contexts/AdminAuthContext";
import { AdminSystemSettingsProvider } from "@/src/contexts/AdminSystemSettingsContext";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminSystemSettingsProvider>
        <AdminShell>{children}</AdminShell>
      </AdminSystemSettingsProvider>
    </AdminAuthProvider>
  );
}
