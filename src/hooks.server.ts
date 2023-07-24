import { db } from "$lib/sqlite";
import type { Handle } from "@sveltejs/kit";
import jwt from "jsonwebtoken"

export const handle = (async ({ event, resolve }) => {
  event.locals.appDatabase = db

  const jwt_cookie = event.cookies.get("jwt")
  if (jwt_cookie) {
    const decoded = jwt.decode(jwt_cookie, { complete: true })
    if (!decoded) {
      throw `provided token does not decode as JWT`
    }

    event.locals.loggedInUser = event.locals.appDatabase.userDao.getUser(decoded.payload.username)
  } else {
    event.locals.loggedInUser = null
  }

  return await resolve(event);
}) satisfies Handle 
