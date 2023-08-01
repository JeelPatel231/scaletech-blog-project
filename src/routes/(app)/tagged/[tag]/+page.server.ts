import { Blog } from "$lib/typeORM/Blog";
import { error, type ServerLoad } from "@sveltejs/kit";
import { instanceToPlain } from "class-transformer";
import { ArrayContains } from "typeorm";
export const load = (async ({ params }) => {
  if (!params.tag)
    throw error(404)

  const blogs = await Blog.getBlogEntries({
    tags: ArrayContains([params.tag.toLowerCase()]),
  })

  return {
    tag: params.tag,
    blogs: instanceToPlain(blogs) as Blog[]
  }

}) satisfies ServerLoad
