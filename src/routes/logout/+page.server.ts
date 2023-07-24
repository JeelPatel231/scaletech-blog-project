import { redirect, type ServerLoad } from "@sveltejs/kit"

export const load = (async ({ cookies }) => {
  cookies.delete('jwt')
  throw redirect(307, '/login')
}) satisfies ServerLoad
