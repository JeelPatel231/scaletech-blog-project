import { error, type ServerLoad } from "@sveltejs/kit";
import { remark } from "remark";
import html from "remark-html"
import remarkGfm from 'remark-gfm'
import breaks from "remark-breaks"
import remarkImages from "remark-images"
import extendedTable from "remark-extended-table"
import { TORMBlog } from "$lib/typeORM/Blog";

const remarkProcessor = remark()
  .use(html)
  .use(breaks)
  .use(remarkGfm)
  .use(remarkImages)
  .use(extendedTable)

export const load = (async ({ params }) => {
  if (!params.id)
    throw error(404)

  const blog = await TORMBlog.findOne({ where: { id: params.id }, relations: { author: true } })

  if (blog === null) throw error(404)

  const processedContent = await remarkProcessor.process(blog.content);

  return {
    blog: blog.getPOJO(),
    htmlRender: processedContent.toString(),
  }

}) satisfies ServerLoad
