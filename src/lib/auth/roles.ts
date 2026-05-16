export const ADMIN_ROLES = ["ADMIN", "STAFF"] as const;

export function isAdminRole(role: string): boolean {
  return (ADMIN_ROLES as readonly string[]).includes(role);
}

export function isClientRole(role: string): boolean {
  return role === "USER";
}

export function getPostSignInPath(role: string, clientNextPath?: string): string {
  if (isAdminRole(role)) {
    return "/admin";
  }

  if (clientNextPath?.startsWith("/client")) {
    return clientNextPath;
  }

  return "/client";
}
