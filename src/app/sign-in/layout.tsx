import type { ReactNode } from "react";
import { AdminAuthProvider } from "@/src/contexts/AdminAuthContext";

export default function SignInLayout({ children }: { children: ReactNode }) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}
