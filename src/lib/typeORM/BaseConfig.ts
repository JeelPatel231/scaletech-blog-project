import { APP_CONFIG } from "$lib/AppConfig"
import { Blog } from "./Blog"
import { User } from "./User"

export const BaseDataSourceConfig = {
  synchronize: true,
  // logs only in development environment
  logging: APP_CONFIG.mode === "development",
  entities: [User, Blog],
  subscribers: [],
  migrations: [],
}
