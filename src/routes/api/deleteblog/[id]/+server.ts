import { Blog } from "$lib/typeORM/Blog";
import { json, redirect } from "@sveltejs/kit";
import type { RequestHandler } from './$types';

export const POST = (async ({ locals, url, params }) => {

  const blogId = params.id
  if (blogId === null) {
    return json({ error: { blog_id: "Invalid Blog ID Provided" } }, { status: 404 })
  }
  const blogEntry = await Blog.getFullBlog(blogId.toString())
  if (blogEntry === null) {
    return json({ error: { blog_id: "Blog not found in Database" } }, { status: 404 })
  }

  if (locals.loggedInUser?.username !== blogEntry.author.username) {
    return json({ error: { blog_id: "Unauthorised to Delete Blog" } }, { status: 403 })
  }

  blogEntry.remove()

  const redirectUrl = url.searchParams.get('next')
  if (redirectUrl) {
    throw redirect(302, redirectUrl)
  }

  return json({ success: true })
}) satisfies RequestHandler;
