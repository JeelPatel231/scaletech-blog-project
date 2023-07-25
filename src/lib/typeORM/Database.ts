//https://typeorm.io/#installation
import "reflect-metadata"
import { DataSource } from "typeorm";
import { BaseDataSourceConfig } from "./BaseConfig";

export const AppDataSource = new DataSource({
  // TODO : move to env file
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "postgres",
  ...BaseDataSourceConfig
})

