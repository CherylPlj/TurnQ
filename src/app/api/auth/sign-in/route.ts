import { NextResponse } from "next/server";
import { serverErrorResponse } from "@/src/lib/auth/api-errors";
import { signInErrorResponse } from "@/src/lib/auth/api";
import { SIGN_IN_ERRORS } from "@/src/lib/auth/messages";
import { verifyPassword } from "@/src/lib/auth/password";
import {
  createSessionToken,
  setSessionCookie,
  toPublicUser,
} from "@/src/lib/auth/session";
import { clientSignInSchema } from "@/src/lib/auth/validation";
import { prisma } from "@/src/lib/prisma";
import { createRouteLogger } from "@/src/lib/dev-logger";

export async function POST(request: Request) {
  const log = createRouteLogger("/api/auth/sign-in", "POST");

  let body: unknown;

  try {
    body = await request.json();
    log.step("Parsed request body");
  } catch (error) {
    log.warn("Invalid JSON body", { error: error instanceof Error ? error.message : String(error) });
    return signInErrorResponse(400);
  }

  const parsed = clientSignInSchema.safeParse(body);

  if (!parsed.success) {
    log.warn("Validation failed", {
      issueCount: parsed.error.issues.length,
      fields: parsed.error.issues.map((issue) => issue.path.join(".")),
    });
    return signInErrorResponse(401);
  }

  const { email, password } = parsed.data;
  log.step("Validated credentials shape", { email });

  try {
    log.step("Looking up user by email");
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        passwordHash: true,
      },
    });

    if (!user) {
      log.warn("No user found for email", { email });
      return signInErrorResponse(401);
    }

    log.step("User found", { userId: user.id, role: user.role });

    const passwordValid = await verifyPassword(password, user.passwordHash);

    if (!passwordValid) {
      log.warn("Password verification failed", { userId: user.id, email });
      return signInErrorResponse(401);
    }

    log.step("Password verified, creating session token", {
      hasSessionSecret: Boolean(process.env.SESSION_SECRET),
      sessionSecretLength: process.env.SESSION_SECRET?.length ?? 0,
    });
    const token = await createSessionToken({
      sub: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    });

    log.step("Setting session cookie");
    await setSessionCookie(token);

    log.success("Sign-in completed", {
      userId: user.id,
      role: user.role,
      elapsedMs: log.elapsedMs(),
    });

    return NextResponse.json({
      user: toPublicUser({
        sub: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      }),
    });
  } catch (error) {
    log.failure("Sign-in failed with server error", error, { email });
    return serverErrorResponse(SIGN_IN_ERRORS.serverError, error);
  }
}
