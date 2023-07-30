import { Blog } from "$lib/typeORM/Blog";
import type { ServerLoad } from "@sveltejs/kit";
import { instanceToPlain } from "class-transformer";

export const load = (async () => {

  const blogs = await Blog.find({ relations: { author: true }, order: { creation_date: "DESC" } })
  return {
    blogs: instanceToPlain(blogs) as Blog[]
  }

}) satisfies ServerLoad
