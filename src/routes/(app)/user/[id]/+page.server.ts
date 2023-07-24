import { error, type ServerLoad } from "@sveltejs/kit";
export const load = (async ({ locals, params }) => {
  if (!params.id)
    throw error(404)

  const user = locals.appDatabase.userDao.getUser(params.id)

  if (user === undefined)
    throw error(404)

  return {
    user: user
  }

}) satisfies ServerLoad
