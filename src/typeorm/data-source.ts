import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "./entity/Product";
import { Mig1693495078062 } from "./migration/1693495078062-mig";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 55432,
  username: "simple-typeorm",
  password: "simple",
  database: "postgres",
  entities: [Product],
  migrations: [Mig1693495078062],
  synchronize: false,
  logging: false,
});
