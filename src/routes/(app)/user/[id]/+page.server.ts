import { User } from "$lib/typeORM/User";
import { error, type ServerLoad } from "@sveltejs/kit";
import { instanceToPlain } from "class-transformer";
export const load = (async ({ params }) => {
  if (!params.id)
    throw error(404)

  const user = await User.getUserDetails(params.id.toLowerCase())

  if (user === null)
    throw error(404)

  return {
    user: instanceToPlain(user) as User,
  }

}) satisfies ServerLoad
