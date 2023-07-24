import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals }) => {
  return {
    user: locals.loggedInUser
  }
}) satisfies LayoutServerLoad;
