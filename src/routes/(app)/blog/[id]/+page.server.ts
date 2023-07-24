import { error, type ServerLoad } from "@sveltejs/kit";
import { remark } from "remark";
import html from "remark-html"
import remarkGfm from 'remark-gfm'
import breaks from "remark-breaks"
import remarkImages from "remark-images"
import extendedTable from "remark-extended-table"

const remarkProcessor = remark()
  .use(html)
  .use(breaks)
  .use(remarkGfm)
  .use(remarkImages)
  .use(extendedTable)

export const load = (async ({ locals, params }) => {
  if (!params.id)
    throw error(404)

  const blog = locals.appDatabase.blogDao.getBlogData(params.id)

  if (blog === undefined) throw error(404)

  const processedContent = await remarkProcessor.process(blog.content);

  return {
    blog: blog,
    htmlRender: processedContent.toString(),
  }

}) satisfies ServerLoad
