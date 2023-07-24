import { type Actions, fail, redirect } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { jwtSecretKey } from "$lib/JWT";
import { BaseUserSchema } from "$lib/User";
import { isZodError } from "$lib/ZodError";

export const actions = {
  default: async ({ cookies, request, locals }) => {
    const data = Object.fromEntries(await request.formData());

    let validLogin;
    try {
      validLogin = BaseUserSchema.parse(data);
    } catch (e: any) {
      if (isZodError(e)) {
        return fail(400, e.formErrors.fieldErrors)
      }
    }

    if (validLogin === undefined) return fail(400)

    const userFromDB = locals.appDatabase.userDao.getFullUser(validLogin.username)

    if (userFromDB === undefined)
      return fail(400, { username: "User doesn't exist." })

    if (!await bcrypt.compare(validLogin.password, userFromDB.password))
      return fail(400, { password: "Incorrect password entered." })

    const jwtData = {
      time: new Date(),
      username: validLogin.username,
    }

    cookies.set("jwt", jwt.sign(jwtData, jwtSecretKey))

    throw redirect(302, '/')
  }
} satisfies Actions;
