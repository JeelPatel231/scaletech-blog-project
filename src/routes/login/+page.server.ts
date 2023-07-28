import { type Actions, fail, redirect, type ServerLoad } from "@sveltejs/kit";
import * as jose from "jose"
import { BaseUserSchema } from "$lib/zodValidations/User";
import { User } from "$lib/typeORM/User";
import { APP_CONFIG } from "$lib/AppConfig";
import { matchSHA256Hash } from "$lib/Password";

export const load = (async ({ locals }) => {
  // Throw user to home page when already logged in 
  if (locals.loggedInUser !== null) {
    throw redirect(302, '/')
  }
}) satisfies ServerLoad

export const actions = {
  default: async ({ cookies, request, url }) => {
    const data = Object.fromEntries(await request.formData());
    // strip out data that doesnt need to be returned, like password
    const { password, ...returnData } = data;

    const validLogin = await BaseUserSchema.safeParseAsync(data);
    if (!validLogin.success) {
      return fail(400, { returnData, errors: validLogin.error.formErrors.fieldErrors })
    }

    const userFromDB = await User.findOne({
      where: {
        username: validLogin.data.username
      },
      select: {
        password: true
      }
    })

    if (userFromDB === null)
      return fail(400, { returnData, errors: { username: "User doesn't exist." } })

    if (!await matchSHA256Hash(validLogin.data.password, userFromDB.password))
      return fail(400, { returnData, errors: { password: "Incorrect password entered." } })

    const jwtData = {
      time: new Date(),
      username: validLogin.data.username,
    }

    const JWTcookie = await new jose.SignJWT(jwtData)
      .setProtectedHeader({ alg: APP_CONFIG.jwtAlg })
      .setIssuedAt()
      .setIssuer(url.origin)
      .setAudience(url.origin)
      .setExpirationTime('2h')
      .sign(APP_CONFIG.jwtToken)

    cookies.set("jwt", JWTcookie)

    throw redirect(302, '/')
  }
} satisfies Actions;
