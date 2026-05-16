import { SIGN_IN_ERRORS, SIGN_UP_ERRORS } from "./messages";

export type PublicUser = {
  id: string;
  email: string;
  fullName: string;
  role: string;
};

type AuthSuccess = {
  user: PublicUser;
};

type AuthError = {
  error: string;
  fieldErrors?: Record<string, string>;
};

async function parseSignUpResponse(response: Response): Promise<AuthSuccess | AuthError> {
  const data = (await response.json()) as AuthSuccess & AuthError;

  if (!response.ok) {
    return {
      error: data.error ?? SIGN_UP_ERRORS.serverError,
      fieldErrors: data.fieldErrors,
    };
  }

  return { user: data.user };
}

async function parseSignInResponse(response: Response): Promise<AuthSuccess | AuthError> {
  const data = (await response.json()) as AuthSuccess & AuthError;

  if (!response.ok) {
    if (response.status >= 500) {
      return { error: SIGN_IN_ERRORS.serverError };
    }

    return { error: data.error ?? SIGN_IN_ERRORS.invalidCredentials };
  }

  return { user: data.user };
}

export async function signUpClient(payload: {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean;
}) {
  const response = await fetch("/api/auth/sign-up", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return parseSignUpResponse(response);
}

export async function signIn(payload: { email: string; password: string }) {
  const response = await fetch("/api/auth/sign-in", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return parseSignInResponse(response);
}

/** @deprecated Use signIn */
export const signInClient = signIn;

export async function signOut() {
  await fetch("/api/auth/sign-out", { method: "POST" });
}

/** @deprecated Use signOut */
export const signOutClient = signOut;

export async function fetchCurrentUser() {
  const response = await fetch("/api/auth/me", { cache: "no-store" });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as { user: PublicUser | null };
  return data.user;
}

/** @deprecated Use fetchCurrentUser */
export const fetchCurrentClient = fetchCurrentUser;
