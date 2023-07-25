// See https://kit.svelte.dev/docs/types#app
import type { TORMUser } from "$lib/typeORM/User";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			loggedInUser: TORMUser | null,
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };
