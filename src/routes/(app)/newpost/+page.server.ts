import { Blog } from "$lib/typeORM/Blog";
import { BlogValidationSchema } from "$lib/zodValidations/Blog";
import { type Actions, fail, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, locals }) => {
    if (locals.loggedInUser === null) {
      throw redirect(302, '/login')
    }

    const formData = await request.formData()
    const data = Object.fromEntries([...formData]);
    const parsedData = await BlogValidationSchema.safeParseAsync(data)

    if (!parsedData.success) {
      return fail(400, { data, errors: parsedData.error.formErrors.fieldErrors })
    }

    const dbBlogEntry = new Blog();
    dbBlogEntry.setAttributes({
      ...parsedData.data,
      author: locals.loggedInUser,
    })
    dbBlogEntry.save()

    throw redirect(302, `/blog/${dbBlogEntry.id}`)
  },
} satisfies Actions;
