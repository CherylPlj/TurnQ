export function withAuthSuccessParam(path: string, success: string): string {
  const [pathname, query = ""] = path.split("?");
  const params = new URLSearchParams(query);
  params.set("success", success);
  const search = params.toString();
  return search ? `${pathname}?${search}` : path;
}
