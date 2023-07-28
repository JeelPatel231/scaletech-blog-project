import { SHA256hash } from "$lib/Password";
import { User } from "$lib/typeORM/User";
import { UserValidationSchema } from "$lib/zodValidations/User";
import { type Actions, fail, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request }) => {
    const data = Object.fromEntries(await request.formData())
    // strip out data that doesnt need to be returned, like password and avatar
    const { password, passwordConfirm, avatar, ...returnData } = data;

    const parsedResult = await UserValidationSchema.safeParseAsync(data)

    if (!parsedResult.success) {
      return fail(400, { returnData, errors: parsedResult.error.formErrors.fieldErrors })
    }

    const userFromDB = await User.findOneBy({ username: parsedResult.data.username })
    if (userFromDB !== null) {
      return fail(400, { returnData, errors: { username: "Username already taken" } })
    }

    const userObject = new User()

    // const avatarFile = data.avatar as File
    // if (avatarFile.size !== 0) {
    //   if (avatarFile.name.endsWith(".png")) {
    //     const buffer = Buffer.from(await avatarFile.arrayBuffer());
    //     // TODO : compress images
    //     // TODO : handle troll large uploads 
    //     fs.writeFileSync(`static/avatar/${parsedResult.data.username}.png`, buffer, "base64");
    //     userObject.setAttributes({ avatar: true })
    //   } else {
    //     return fail(400, { returnData, errors: { avatar: "Invalid Image Format! PNGs only" } })
    //   }
    // }

    userObject.setAttributes({
      ...parsedResult.data,
      password: await SHA256hash(parsedResult.data.password)
    })

    await userObject.save()
    throw redirect(307, '/login')
  },
} satisfies Actions;
