const SENSITIVE_KEYS = new Set([
  "password",
  "passwordhash",
  "confirmpassword",
  "token",
  "session_secret",
  "authorization",
]);

export function isDevEnvironment(): boolean {
  return process.env.NODE_ENV === "development";
}

function redactValue(key: string, value: unknown): unknown {
  if (SENSITIVE_KEYS.has(key.toLowerCase())) {
    return "[redacted]";
  }

  if (value && typeof value === "object" && !Array.isArray(value)) {
    return redactData(value as Record<string, unknown>);
  }

  return value;
}

export function redactData(data?: Record<string, unknown>): Record<string, unknown> | undefined {
  if (!data) {
    return undefined;
  }

  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, redactValue(key, value)]),
  );
}

function formatError(error: unknown): Record<string, unknown> {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return { message: String(error) };
}

export function devDebugMessage(error: unknown): string | undefined {
  if (!isDevEnvironment()) {
    return undefined;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

type RouteLogger = {
  step: (message: string, data?: Record<string, unknown>) => void;
  warn: (message: string, data?: Record<string, unknown>) => void;
  success: (message: string, data?: Record<string, unknown>) => void;
  failure: (message: string, error: unknown, data?: Record<string, unknown>) => void;
  elapsedMs: () => number;
};

export function createRouteLogger(route: string, method = "REQUEST"): RouteLogger {
  const startedAt = Date.now();
  const prefix = `[${method} ${route}]`;

  function log(level: "log" | "warn" | "error", message: string, data?: Record<string, unknown>) {
    if (!isDevEnvironment()) {
      return;
    }

    const payload = redactData(data);
    const timing = `${Date.now() - startedAt}ms`;

    if (payload && Object.keys(payload).length > 0) {
      console[level](`${prefix} ${message} (${timing})`, payload);
      return;
    }

    console[level](`${prefix} ${message} (${timing})`);
  }

  return {
    step: (message, data) => log("log", message, data),
    warn: (message, data) => log("warn", message, data),
    success: (message, data) => log("log", `✓ ${message}`, data),
    failure: (message, error, data) => {
      if (!isDevEnvironment()) {
        return;
      }

      const timing = `${Date.now() - startedAt}ms`;
      console.error(`${prefix} ✗ ${message} (${timing})`, {
        ...redactData(data),
        error: formatError(error),
      });
    },
    elapsedMs: () => Date.now() - startedAt,
  };
}
