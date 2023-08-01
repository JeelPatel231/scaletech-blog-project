import { AppDataSource } from "$lib/typeORM/Database";
import { User } from "$lib/typeORM/User";
import type { Handle } from "@sveltejs/kit";
import jwt from "jsonwebtoken"

export const handle = (async ({ event, resolve }) => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize()
  }

  const jwt_cookie = event.cookies.get("jwt")
  if (jwt_cookie) {
    const decodedPayload = jwt.decode(jwt_cookie, { complete: true })?.payload

    if (!decodedPayload || typeof decodedPayload === "string") {
      throw `provided token does not decode as JWT`
    }

    const userData = await User.getUserDetails(decodedPayload.username)

    event.locals.loggedInUser = userData?.getPOJO() as User ?? null
  } else {
    event.locals.loggedInUser = null
  }

  return await resolve(event);
}) satisfies Handle 
