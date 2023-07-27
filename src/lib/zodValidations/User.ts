import { z } from "zod";

export const BaseUserSchema = z.object({
  username: z.string().trim()
    .min(4).max(20)
    .refine((val) => !val.includes(' '), {
      message: "No Whitespaces Allowed in Username",
    })
    .transform(x => x.toLowerCase()),
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

