import { APP_CONFIG } from "$lib/AppConfig";
import { AppDataSource } from "$lib/typeORM/Database";
import { User } from "$lib/typeORM/User";
import { redirect, type Handle } from "@sveltejs/kit";
import * as jose from "jose"

export const handle = (async ({ event, resolve }) => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize()
  }

  const jwt_cookie = event.cookies.get("jwt")
  if (jwt_cookie) {
    try {
      const { payload, protectedHeader } = await jose.jwtVerify(jwt_cookie, APP_CONFIG.jwtToken, {
        // TODO: research if needs hardcoding.
        issuer: event.url.origin,
        audience: event.url.origin,
      })

      const userData = await User.findOneBy({
        username: payload.username as string
      })

      event.locals.loggedInUser = userData?.getPOJO() as User ?? null
    } catch (e: any) {
      event.cookies.delete("jwt")
      // malformed JWT token, clear the cookie and throw user at login page
      throw redirect(307, '/login')
    }
  } else {
    // no cookie?, not logged in
    event.locals.loggedInUser = null
  }


  return await resolve(event);
}) satisfies Handle 
