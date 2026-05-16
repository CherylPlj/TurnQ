/** Generic messages for sign-in — do not reveal account existence or role. */
export const SIGN_IN_ERRORS = {
  invalidCredentials: "Invalid email or password.",
  unableToSignIn: "Unable to sign in. Please check your email and password and try again.",
  serverError: "Something went wrong. Please try again later.",
} as const;

/** Success messages shown after auth actions. */
export const AUTH_SUCCESS = {
  signedUp: "Your account was created successfully. Welcome to TurnQ!",
  signedIn: "You have signed in successfully.",
  signedInAdmin: "Welcome back. You are now signed in to the admin dashboard.",
  signedOut: "You have been signed out successfully.",
} as const;

export type AuthSuccessType = keyof typeof AUTH_SUCCESS;

/** Informative messages for sign-up — help the user fix their input. */
export const SIGN_UP_ERRORS = {
  validationSummary: "Please correct the highlighted fields to create your account.",
  emailTaken: "Invalid email.",
  emailTakenField: "Invalid email.",
  serverError: "We couldn't create your account right now. Please try again in a moment.",
  invalidBody: "Invalid sign-up request. Please refresh the page and try again.",
} as const;
