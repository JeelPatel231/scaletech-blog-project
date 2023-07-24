import type { ZodError } from "zod";

export function isZodError(e: unknown): e is ZodError {
  return (e as ZodError).formErrors !== undefined
}
