import { NextResponse } from "next/server";
import { serverErrorResponse } from "@/src/lib/auth/api-errors";
import { clearSessionCookie } from "@/src/lib/auth/session";
import { createRouteLogger } from "@/src/lib/dev-logger";

export async function POST() {
  const log = createRouteLogger("/api/auth/sign-out", "POST");

  try {
    log.step("Clearing session cookie");
    await clearSessionCookie();
    log.success("Sign-out completed");
    return NextResponse.json({ success: true });
  } catch (error) {
    log.failure("Sign-out failed", error);
    return serverErrorResponse("Failed to sign out.", error);
  }
}
