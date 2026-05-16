import { signOut } from "@/src/lib/auth/client";

export async function performLogout(redirectPath = "/sign-in"): Promise<void> {
  await signOut();

  if (typeof window !== "undefined") {
    window.history.replaceState(null, "", redirectPath);
  }
}
