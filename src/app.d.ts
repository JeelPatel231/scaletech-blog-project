// See https://kit.svelte.dev/docs/types#app

import type { OutputUser } from "$lib/User";
import type { AppDatabase } from "$lib/sqlite";
import type Database from "better-sqlite3";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			appDatabase: AppDatabase,
			loggedInUser: OutputUser | undefined,
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };
