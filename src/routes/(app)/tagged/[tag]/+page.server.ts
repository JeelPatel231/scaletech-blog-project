import { Blog } from "$lib/typeORM/Blog";
import { error, type ServerLoad } from "@sveltejs/kit";
import { instanceToPlain } from "class-transformer";
import { ArrayContains } from "typeorm";
export const load = (async ({ params }) => {
  if (!params.tag)
    throw error(404)

  const blogs = await Blog.find({ where: { tags: ArrayContains([params.tag]) } })

  return {
    blogs: instanceToPlain(blogs)
  }

}) satisfies ServerLoad
