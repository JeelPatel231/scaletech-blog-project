import { TORMBlog } from "./Blog"
import { TORMUser } from "./User"

export const BaseDataSourceConfig = {
  synchronize: true,
  logging: true,
  entities: [TORMUser, TORMBlog],
  subscribers: [],
  migrations: [],
}
