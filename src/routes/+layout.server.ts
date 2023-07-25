import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals }) => {
  return {
    loggedInUser: locals.loggedInUser
  }
}) satisfies LayoutServerLoad;
