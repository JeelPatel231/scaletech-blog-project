import type { ServerLoad } from "@sveltejs/kit";

export const load = (async ({ locals }) => {
  const blogs = locals.appDatabase.blogDao.getAllBlogs()

  return {
    blogs: blogs,
  }

}) satisfies ServerLoad
