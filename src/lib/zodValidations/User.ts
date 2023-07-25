import { z } from "zod";

export const BaseUserSchema = z.object({
  username: z.string().trim()
    .min(4).max(20)
    .refine((val) => !val.includes(' '), {
      message: "No Whitespaces Allowed in Username",
    }),
  password: z.string().min(8),
})

const UserSchema = BaseUserSchema.extend({
  last_name: z.string().max(20),
  first_name: z.string().max(20),
})

export const UserValidationSchema = UserSchema.extend({
  passwordConfirm: z.string().min(8),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"],
})

