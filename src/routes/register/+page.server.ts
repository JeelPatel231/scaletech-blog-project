import { UserValidationSchema } from "$lib/User";
import { isZodError } from "$lib/ZodError";
import { type Actions, fail, redirect } from "@sveltejs/kit";
import bcrypt from "bcrypt";

const isError = (e: unknown): e is Error => {
  return (e as Error).message !== undefined
}

export const actions = {
  default: async ({ request, locals }) => {
    try {
      const formData = await request.formData()
      const data = Object.fromEntries([...formData]);
      const parsedData = UserValidationSchema.parse(data)
      const salt = await bcrypt.genSalt(10)

      // const avatarFile = formData.get('avatar')
      //
      // if (!(avatarFile instanceof Object) || !avatarFile.name) {
      //   return fail(400, { fieldErrors: { avatar: 'invalid file' } });
      // }

      // TODO : IT DONT WORK
      // const buffer = Buffer.from(await avatarFile.arrayBuffer());
      // fs.writeFileSync(`static/avatars/${parsedData.avatar}.png`, buffer, "base64");
      //
      // console.log(buffer)

      const userObject = {
        password: await bcrypt.hash(parsedData.password, salt),
        username: parsedData.username,
        avatar: parsedData.avatar,
        last_name: parsedData.last_name,
        first_name: parsedData.first_name,
        account_created: parsedData.account_created,
      }

      locals.appDatabase.userDao.insertUser(userObject)

    } catch (e: any) {
      console.log(e)
      if (isZodError(e)) {
        return fail(400, e.formErrors.fieldErrors)
      }
      else if (isError(e) && e.message.startsWith("UNIQUE constraint failed")) {
        return fail(400, { username: "Account already exists!" })
      }
    }

    throw redirect(302, '/login')
  },
} satisfies Actions;
