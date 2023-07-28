import { z } from "zod";

const USERNAME_REGEX = /^[a-z0-9]{4,20}$/

export const BaseUserSchema = z.object({
  username: z.string().trim()
    .transform(x => x.toLowerCase())
    .refine(val => USERNAME_REGEX.test(val), {
      message: "Only alphanumeric strings allowed in username, length between 4 and 20 characters."
    }),
  password: z.string().trim().min(8),
})

const UserSchema = BaseUserSchema.extend({
  last_name: z.string().trim().max(20).min(1),
  first_name: z.string().trim().max(20).min(1),
})

export const UserValidationSchema = UserSchema.extend({
  passwordConfirm: z.string().trim().min(8),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"],
})

