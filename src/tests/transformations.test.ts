import { expect, test } from "vitest";
import { UserValidationSchema } from "$lib/zodValidations/User";


test("zod username transformation", async () => {
  const userobj = {
    avatar: false,
    username: "Jeel",
    first_name: "Jeel",
    last_name: "Patel",
    password: "DBTESTING",
    passwordConfirm: "DBTESTING"
  }
  const parsed = UserValidationSchema.parse(userobj)
  expect(userobj.username === parsed.username).toBeFalsy()
  expect(userobj.username.toLowerCase() === parsed.username).toBeTruthy()
})
