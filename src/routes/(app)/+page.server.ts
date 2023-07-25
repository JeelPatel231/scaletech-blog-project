import { Blog } from "$lib/typeORM/Blog";
import type { ServerLoad } from "@sveltejs/kit";

export const load = (async () => {

  const blogs = await Blog.find({ relations: { author: true } })

  return {
    blogs: blogs
  }

}) satisfies ServerLoad
