import { NextResponse } from "next/server";

/** Prevent browsers from serving protected pages from back/forward cache after logout. */
export function withNoStoreHeaders(response: NextResponse): NextResponse {
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");
  return response;
}
