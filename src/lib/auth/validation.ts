import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .min(1, "Enter your email address.")
  .max(254, "Email must be 254 characters or fewer.")
  .email("Enter a valid email address (e.g. name@example.com).")
  .transform((value) => value.toLowerCase());

const fullNameSchema = z
  .string()
  .trim()
  .min(2, "Full name must be at least 2 characters.")
  .max(100, "Full name must be 100 characters or fewer.")
  .regex(
    /^[\p{L}\p{M}\s'.-]+$/u,
    "Full name may only contain letters, spaces, and characters like ' . -",
  );

function validatePasswordRequirements(password: string, ctx: z.RefinementCtx) {
  const missing: string[] = [];

  if (password.length < 8) {
    missing.push("at least 8 characters");
  }
  if (password.length > 128) {
    missing.push("no more than 128 characters");
  }
  if (!/[a-z]/.test(password)) {
    missing.push("one lowercase letter");
  }
  if (!/[A-Z]/.test(password)) {
    missing.push("one uppercase letter");
  }
  if (!/[0-9]/.test(password)) {
    missing.push("one number");
  }

  if (missing.length > 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Password must include ${missing.join(", ")}.`,
      path: ["password"],
    });
  }
}

const passwordSchema = z.string().superRefine(validatePasswordRequirements);

/** Loose checks for sign-in — detailed errors are not returned to the client. */
const signInEmailSchema = z
  .string()
  .trim()
  .min(1)
  .max(254)
  .email()
  .transform((value) => value.toLowerCase());

export const clientSignUpSchema = z
  .object({
    fullName: fullNameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Re-enter your password to confirm it."),
    agreedToTerms: z.boolean().refine((value) => value === true, {
      message: "You must agree to the Terms and Conditions before creating an account.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match. Make sure both fields are identical.",
    path: ["confirmPassword"],
  });

export const clientSignInSchema = z.object({
  email: signInEmailSchema,
  password: z.string().min(1).max(128),
});

export type ClientSignUpInput = z.infer<typeof clientSignUpSchema>;
export type ClientSignInInput = z.infer<typeof clientSignInSchema>;

export function formatSignUpFieldErrors(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};

  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key !== "string") {
      continue;
    }

    if (!fieldErrors[key]) {
      fieldErrors[key] = issue.message;
      continue;
    }

    if (!fieldErrors[key].includes(issue.message)) {
      fieldErrors[key] = `${fieldErrors[key]} ${issue.message}`;
    }
  }

  return fieldErrors;
}
