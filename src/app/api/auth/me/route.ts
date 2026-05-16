import { NextResponse } from "next/server";
import { serverErrorResponse } from "@/src/lib/auth/api-errors";
import { getSessionFromCookies, toPublicUser } from "@/src/lib/auth/session";
import { prisma } from "@/src/lib/prisma";
import { createRouteLogger } from "@/src/lib/dev-logger";

export async function GET() {
  const log = createRouteLogger("/api/auth/me", "GET");

  try {
    log.step("Reading session cookie");
    const session = await getSessionFromCookies();

    if (!session) {
      log.warn("No active session");
      return NextResponse.json({ user: null }, { status: 401 });
    }

    log.step("Session found", { userId: session.sub, role: session.role });

    const user = await prisma.user.findUnique({
      where: { id: session.sub },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
      },
    });

    if (!user) {
      log.warn("Session user not found in database", { userId: session.sub });
      return NextResponse.json({ user: null }, { status: 401 });
    }

    log.success("Session user loaded", { userId: user.id, role: user.role });

    return NextResponse.json({
      user: toPublicUser({
        sub: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      }),
    });
  } catch (error) {
    log.failure("Failed to load current user", error);
    return serverErrorResponse("Failed to load current user.", error);
  }
}
