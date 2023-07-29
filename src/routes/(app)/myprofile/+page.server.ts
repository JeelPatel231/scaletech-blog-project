import { User } from "$lib/typeORM/User";
import { fail, redirect, type ServerLoad } from "@sveltejs/kit";
import { instanceToPlain } from "class-transformer";
import { error } from "console";
import bcrypt from "bcrypt";
import type { Actions } from "./$types";
import { PasswordValidationSchema } from "$lib/zodValidations/User";


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

export const actions = {
  default: async ({ request, locals }) => {
    const data = Object.fromEntries(await request.formData())
    // strip out data that doesnt need to be returned, like password and avatar

    const parsedResult = await PasswordValidationSchema.safeParseAsync(data)

    if (!parsedResult.success) {
      return fail(400, { success: false, errors: parsedResult.error.formErrors.fieldErrors })
    }

    const userFromDB = await User.findOneBy({ username: locals.loggedInUser!.username })
    if (userFromDB === null) {
      // todo : delete cookie and ask to relogin 
      return fail(400, { success: false, errors: { password: "Bad Password Change Request" } })
    }

    const salt = await bcrypt.genSalt(10)

    userFromDB.setAttributes({
      password: await bcrypt.hash(parsedResult.data.password, salt),
    })

    await userFromDB.save()

    return { success: true }
  },
} satisfies Actions;
