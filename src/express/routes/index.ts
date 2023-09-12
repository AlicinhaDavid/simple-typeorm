import { Router } from "express";
import { Request, Response } from "express";
import { productRepository } from "../../typeorm/repository/productRepository";

export const routes = Router();

function helloWorld(request: Request, response: Response) {
  return response.json({ message: "Hello World!" });
}
routes.get("/", helloWorld);

const createProduct = async (request: Request, response: Response) => {
  const { name, description, price, color } = request.body;

  const product = { name, description, price, color };

  const productCreated = await productRepository().createProduct(product);

  return response.json(productCreated);
};

routes.post("/createProduct", createProduct);
