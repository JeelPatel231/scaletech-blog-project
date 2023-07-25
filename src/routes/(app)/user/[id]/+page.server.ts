import { User } from "$lib/typeORM/User";
import { error, type ServerLoad } from "@sveltejs/kit";
export const load = (async ({ params }) => {
  if (!params.id)
    throw error(404)

  const user = await User.findOneBy({ username: params.id })

  if (user === null)
    throw error(404)

  return {
    user: user.getPOJO()
  }

}) satisfies ServerLoad
