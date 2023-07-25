import { isZodError } from "$lib/ZodError";
import { User } from "$lib/typeORM/User";
import { UserValidationSchema } from "$lib/zodValidations/User";
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

      const userObject = new User()
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
      throw e
    }

    throw redirect(302, '/login')
  },
} satisfies Actions;
