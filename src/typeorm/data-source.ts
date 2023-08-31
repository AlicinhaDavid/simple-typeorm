import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 55432,
  username: "simple-typeorm",
  password: "simple",
  database: "postgres",
  synchronize: false,
  logging: false,
});
