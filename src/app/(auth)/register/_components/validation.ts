import { z } from "zod";

export const registerFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters")
    .refine(
      (password) =>
        [/[A-Z]/, /[a-z]/, /\d/, /[!@#$%^&*(),.?":{}|<>]/].filter((regex) =>
          regex.test(password)
        ).length >= 2,
      {
        message:
          "Password must contain at least 2 of these rules: one uppercase letter, one lowercase letter, one numeric character, one special character",
      }
    ),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .regex(
      /^[a-zA-Z0-9._]+$/,
      "Usernames can only contain letters, numbers, underscores, and periods."
    ),
  phone_number: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
  country_id: z.string().min(1, "Country is required"),
  referral_code: z.string().optional(),
  otp: z
    .string()
    .length(4, "OTP must be exactly 4 digits")
    .regex(/^\d{4}$/, "OTP must only contain numbers"),
  useCases: z.array(z.number()).optional(),
});
