import { type Actions, fail, redirect, type ServerLoad } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { BaseUserSchema } from "$lib/zodValidations/User";
import { User } from "$lib/typeORM/User";
import { APP_CONFIG } from "$lib/AppConfig";

export const load = (async ({ locals }) => {
  // Throw user to home page when already logged in 
  if (locals.loggedInUser !== null) {
    throw redirect(302, '/')
  }
}) satisfies ServerLoad

export const actions = {
  default: async ({ cookies, request }) => {
    const data = Object.fromEntries(await request.formData());
    // strip out data that doesnt need to be returned, like password
    const { password, ...returnData } = data;

    const validLogin = await BaseUserSchema.safeParseAsync(data);
    if (!validLogin.success) {
      return fail(400, { returnData, errors: validLogin.error.formErrors.fieldErrors })
    }

    const passwordHashed = await User.getUserPassword(validLogin.data.username)

    if (passwordHashed === null)
      return fail(400, { returnData, errors: { username: "User doesn't exist." } })

    if (!await bcrypt.compare(validLogin.data.password, passwordHashed))
      return fail(400, { returnData, errors: { password: "Incorrect password entered." } })

    const jwtData = {
      time: new Date(),
      username: validLogin.data.username,
    }

    cookies.set("jwt", jwt.sign(jwtData, APP_CONFIG.jwtToken))

    throw redirect(302, '/')
  }
} satisfies Actions;
