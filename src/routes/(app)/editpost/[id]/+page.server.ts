import { Blog } from "$lib/typeORM/Blog";
import { BlogValidationSchema } from "$lib/zodValidations/Blog";
import { type Actions, fail, redirect, type ServerLoad } from "@sveltejs/kit";
import { instanceToPlain } from "class-transformer";
import { error } from "console";


export const load = (async ({ params }) => {
  const blogEntry = await Blog.findOneBy({ id: params.id })
  console.log(blogEntry)
  return {
    blog: instanceToPlain(blogEntry) as Blog
  }
}) satisfies ServerLoad

export const actions = {
  default: async ({ request, locals, params }) => {
    if (locals.loggedInUser === null) {
      throw redirect(302, '/login')
    }

    const blogEntry = await Blog.getFullBlog(params.id)

    if (blogEntry === null) {
      throw error(404, "Invalid Blog ID, Not Found")
    }

    if (locals.loggedInUser.username !== blogEntry.author.username) {
      throw error(403, "Forbidden to edit other's blog.")
    }

    const formData = await request.formData()
    const data = Object.fromEntries([...formData]);
    const parsedData = await BlogValidationSchema.safeParseAsync({ ...data, id: params.id })

    if (!parsedData.success) {
      return fail(400, { data, errors: parsedData.error.formErrors.fieldErrors })
    }

    blogEntry.setAttributes(parsedData.data)
    blogEntry.save()

    throw redirect(302, `/blog/${blogEntry.id}`)
  },
} satisfies Actions;
