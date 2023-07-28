import { z } from "zod";

const TAG_REGEX = /^[a-z0-9][a-z0-9-]{2,}[a-z0-9]$/

export const TagValidation = z.string()
  .trim().min(4)
  .refine(tag => TAG_REGEX.test(tag), {
    message: "Only numbers and alphabets and dash (-) are allowed, can only start with alphabet or number."
  })
