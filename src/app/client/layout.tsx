import type { ReactNode } from "react";
import ClientAuthGate from "@/src/components/auth/ClientAuthGate";
import { ClientAuthProvider } from "@/src/contexts/ClientAuthContext";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ClientAuthProvider>
      <ClientAuthGate>{children}</ClientAuthGate>
    </ClientAuthProvider>
  );
}
