import { ZodSchema, z } from "zod";

const USERNAME_REGEX = /^[a-z0-9]{4,20}$/

const simplePassword = z.string().trim().min(8)

export const BaseUserSchema = z.object({
  username: z.string().trim()
    .transform(x => x.toLowerCase())
    .refine(val => USERNAME_REGEX.test(val), {
      message: "Only alphanumeric strings allowed in username, length between 4 and 20 characters."
    }),
  password: simplePassword,
})

const UserSchema = BaseUserSchema.extend({
  last_name: z.string().trim().max(20).min(1),
  first_name: z.string().trim().max(20).min(1),
})

export const PasswordSchema = z.object({
  password: simplePassword,
  passwordConfirm: simplePassword,
})

const addRefinement = <U extends typeof PasswordSchema>(schema: ZodSchema) => {
  return schema.refine((data: z.infer<U>) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  })
}

export const PasswordValidationSchema = addRefinement(PasswordSchema)
export const UserValidationSchema = addRefinement(UserSchema.merge(PasswordSchema))
