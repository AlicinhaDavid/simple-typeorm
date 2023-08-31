import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "./entity/Product";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 55432,
  username: "simple-typeorm",
  password: "simple",
  database: "postgres",
  entities: [Product],
  synchronize: false,
  logging: false,
});
