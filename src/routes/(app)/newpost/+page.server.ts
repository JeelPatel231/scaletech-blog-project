import { BlogValidationSchema } from "$lib/Blog";
import { isZodError } from "$lib/ZodError";
import { type Actions, fail, redirect, error } from "@sveltejs/kit";

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
    data.author_username = locals.loggedInUser.username
    let inserted_blog_id: string | null = null;
    try {
      const parsedData = BlogValidationSchema.parse(data)
      inserted_blog_id = locals.appDatabase.blogDao.insertBlog(parsedData)

    } catch (e: any) {
      if (isZodError(e)) {
        return fail(400, e.formErrors)
      }
      else if (isError(e) && e.message.startsWith("UNIQUE constraint failed")) {
        return fail(400, { fieldErrors: { username: "Account already exists!" } })
      }
    }
    if (inserted_blog_id === null) return
    throw redirect(302, `/blog/${inserted_blog_id}`)
  },
} satisfies Actions;
