import type { ReactNode } from "react";
import { AdminAuthProvider } from "@/src/contexts/AdminAuthContext";

export default function SignUpLayout({ children }: { children: ReactNode }) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}
