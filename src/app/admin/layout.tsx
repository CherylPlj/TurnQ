import type { ReactNode } from "react";
import AdminShell from "@/src/components/admin/AdminShell";
import AdminAuthGate from "@/src/components/auth/AdminAuthGate";
import { AdminAuthProvider } from "@/src/contexts/AdminAuthContext";
import { AdminSystemSettingsProvider } from "@/src/contexts/AdminSystemSettingsContext";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminSystemSettingsProvider>
        <AdminAuthGate>
          <AdminShell>{children}</AdminShell>
        </AdminAuthGate>
      </AdminSystemSettingsProvider>
    </AdminAuthProvider>
  );
}
