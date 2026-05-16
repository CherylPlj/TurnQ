import { NextResponse } from "next/server";
import { devDebugMessage } from "@/src/lib/dev-logger";

export function serverErrorResponse(
  message: string,
  error: unknown,
  extra?: Record<string, unknown>,
) {
  const debug = devDebugMessage(error);

  return NextResponse.json(
    {
      error: message,
      ...(debug ? { debug } : {}),
      ...(extra ?? {}),
    },
    { status: 500 },
  );
}
