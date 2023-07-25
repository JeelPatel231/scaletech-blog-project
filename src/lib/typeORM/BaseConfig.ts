import { Blog } from "./Blog"
import { User } from "./User"

export const BaseDataSourceConfig = {
  synchronize: true,
  logging: true,
  entities: [User, Blog],
  subscribers: [],
  migrations: [],
}
