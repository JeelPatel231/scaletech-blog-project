import { error, type ServerLoad } from "@sveltejs/kit";
export const load = (async ({ locals, params }) => {
  if (!params.tag)
    throw error(404)

  const blogs = locals.appDatabase.blogDao.getBlogByTags(params.tag)

  return {
    blogs: blogs
  }

}) satisfies ServerLoad
