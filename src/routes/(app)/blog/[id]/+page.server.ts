import { error, type ServerLoad } from "@sveltejs/kit";
import { remark } from "remark";
import html from "remark-html"
import remarkGfm from 'remark-gfm'
import breaks from "remark-breaks"
import remarkImages from "remark-images"
import extendedTable from "remark-extended-table"
import { Blog } from "$lib/typeORM/Blog";

const remarkProcessor = remark()
  .use(html)
  .use(breaks)
  .use(remarkGfm)
  .use(remarkImages)
  .use(extendedTable)

export const load = (async ({ params, url }) => {
  if (!params.id)
    throw error(404)

  const blog = await Blog.getFullBlog(params.id)

  if (blog === null) throw error(404)

  const processedContent = await remarkProcessor.process(blog.content);

  return {
    request: {
      origin: url.origin
    },
    blog: blog.getPOJO(),
    htmlRender: processedContent.toString(),
  }

}) satisfies ServerLoad
