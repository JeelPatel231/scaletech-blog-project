//https://typeorm.io/#installation
import "reflect-metadata"
import { DataSource } from "typeorm";
import { BaseDataSourceConfig } from "./BaseConfig";
import { APP_CONFIG } from "$lib/AppConfig";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: APP_CONFIG.postgresUrl,
  ...BaseDataSourceConfig
})

