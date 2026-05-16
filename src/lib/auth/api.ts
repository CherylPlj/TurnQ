import { NextResponse } from "next/server";
import { SIGN_IN_ERRORS, SIGN_UP_ERRORS } from "./messages";
import { formatSignUpFieldErrors } from "./validation";
import type { z } from "zod";

export function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export function signInErrorResponse(status = 401) {
  return NextResponse.json({ error: SIGN_IN_ERRORS.invalidCredentials }, { status });
}

export function signUpValidationErrorResponse(error: z.ZodError) {
  return NextResponse.json(
    {
      error: SIGN_UP_ERRORS.validationSummary,
      fieldErrors: formatSignUpFieldErrors(error),
    },
    { status: 400 },
  );
}
