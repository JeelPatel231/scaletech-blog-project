import { isZodError } from "$lib/ZodError";
import { User } from "$lib/typeORM/User";
import { UserValidationSchema } from "$lib/zodValidations/User";
import { type Actions, fail, redirect } from "@sveltejs/kit";
import bcrypt from "bcrypt";
import fs from "fs"

const isError = (e: unknown): e is Error => {
  return (e as Error).message !== undefined
}

export const actions = {
  default: async ({ request }) => {
    try {
      const data = Object.fromEntries(await request.formData())
      const parsedData = UserValidationSchema.parse(data)

      const userFromDB = await User.findOneBy({ username: parsedData.username })
      if (userFromDB !== null) {
        return fail(400, { username: "Username already taken" })
      }

      const userObject = new User()

      const salt = await bcrypt.genSalt(10)

      const avatarFile = data.avatar as File
      console.log(avatarFile)
      if (avatarFile.size !== 0) {
        if (avatarFile.name.endsWith(".png")) {
          const buffer = Buffer.from(await avatarFile.arrayBuffer());
          // TODO : compress images
          // TODO : handle troll large uploads 
          fs.writeFileSync(`static/avatar/${parsedData.username}.png`, buffer, "base64");
          userObject.setAttributes({ avatar: true })
        } else {
          return fail(400, { avatar: "Invalid Image Format! PNGs only" })
        }
      }

      userObject.setAttributes({
        ...parsedData,
        password: await bcrypt.hash(parsedData.password, salt),
      })

      await userObject.save()
    } catch (e: any) {
      console.log(e)
      if (isZodError(e)) {
        return fail(400, e.formErrors.fieldErrors)
      }

      if (isError(e)) {
        return fail(400, { username: e.stack })
      }

      throw e
    }

    throw redirect(302, '/login')
  },
} satisfies Actions;
