import { User } from "$lib/typeORM/User";
import { redirect, type ServerLoad } from "@sveltejs/kit";
import { instanceToPlain } from "class-transformer";
import { error } from "console";


// TODO : handle change account details 
export const load = (async ({ locals }) => {

  if (!locals.loggedInUser) {
    throw redirect(302, "/login")
  }

  const user = await User.findOne({
    where: {
      username: locals.loggedInUser.username
    },
    relations: {
      blogs: true
    }
  })

  if (user === null)
    throw error(500, "Logged in user doesnt exist in DB, HOW???")

  return {
    userData: instanceToPlain(user) as User
  }

}) satisfies ServerLoad
