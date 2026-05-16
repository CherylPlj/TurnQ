import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { serverErrorResponse } from "@/src/lib/auth/api-errors";
import { jsonError, signUpValidationErrorResponse } from "@/src/lib/auth/api";
import { SIGN_UP_ERRORS } from "@/src/lib/auth/messages";
import { hashPassword } from "@/src/lib/auth/password";
import {
  createSessionToken,
  setSessionCookie,
  toPublicUser,
} from "@/src/lib/auth/session";
import { clientSignUpSchema } from "@/src/lib/auth/validation";
import { prisma } from "@/src/lib/prisma";
import { createRouteLogger } from "@/src/lib/dev-logger";

export async function POST(request: Request) {
  const log = createRouteLogger("/api/auth/sign-up", "POST");

  let body: unknown;

  try {
    body = await request.json();
    log.step("Parsed request body");
  } catch (error) {
    log.warn("Invalid JSON body", { error: error instanceof Error ? error.message : String(error) });
    return jsonError(SIGN_UP_ERRORS.invalidBody, 400);
  }

  const parsed = clientSignUpSchema.safeParse(body);

  if (!parsed.success) {
    log.warn("Validation failed", {
      issueCount: parsed.error.issues.length,
      fields: parsed.error.issues.map((issue) => issue.path.join(".")),
    });
    return signUpValidationErrorResponse(parsed.error);
  }

  const { fullName, email, password } = parsed.data;
  log.step("Validated sign-up payload", { email, fullName });

  try {
    log.step("Checking for existing user");
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      log.warn("Email already registered", { email, existingUserId: existingUser.id });
      return NextResponse.json(
        {
          error: SIGN_UP_ERRORS.emailTaken,
          fieldErrors: { email: SIGN_UP_ERRORS.emailTakenField },
        },
        { status: 409 },
      );
    }

    log.step("Hashing password");
    const passwordHash = await hashPassword(password);

    log.step("Creating user record", { role: Role.USER });
    const user = await prisma.user.create({
      data: {
        email,
        fullName,
        passwordHash,
        role: Role.USER,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
      },
    });

    log.step("Creating session token", { userId: user.id });
    const token = await createSessionToken({
      sub: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    });

    log.step("Setting session cookie");
    await setSessionCookie(token);

    log.success("Sign-up completed", {
      userId: user.id,
      role: user.role,
      elapsedMs: log.elapsedMs(),
    });

    return NextResponse.json(
      {
        user: toPublicUser({
          sub: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
        }),
      },
      { status: 201 },
    );
  } catch (error) {
    log.failure("Sign-up failed with server error", error, { email });
    return serverErrorResponse(SIGN_UP_ERRORS.serverError, error);
  }
}
