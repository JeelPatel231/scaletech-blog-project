import { isZodError } from "$lib/ZodError";
import { Blog } from "$lib/typeORM/Blog";
import { BlogValidationSchema } from "$lib/zodValidations/Blog";
import { type Actions, fail, redirect } from "@sveltejs/kit";

const isError = (e: unknown): e is Error => {
  return (e as Error).message !== undefined
}

export const actions = {
  default: async ({ request, locals }) => {
    if (locals.loggedInUser === null) {
      throw redirect(302, '/login')
    }

    const formData = await request.formData()
    const data = Object.fromEntries([...formData]);
    const dbBlogEntry = new Blog();

    try {
      const parsedData = BlogValidationSchema.parse(data)
      dbBlogEntry.setAttributes({
        ...parsedData,
        author: locals.loggedInUser,
        tags: parsedData.tags.split(" ").filter(x => x.trim() !== '')
      })
      dbBlogEntry.save()

    } catch (e: any) {
      console.log(e)
      if (isZodError(e)) {
        return fail(400, e.formErrors)
      }
      if (isError(e)) {
        return fail(400, { message: e.message })
      }
    }
    if (dbBlogEntry.id === null)
      return fail(400, { fieldErrors: { title: "Something went wrong!" } })

    throw redirect(302, `/blog/${dbBlogEntry.id}`)
  },
} satisfies Actions;
