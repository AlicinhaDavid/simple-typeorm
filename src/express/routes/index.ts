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

const getAllProducts = async (request: Request, response: Response) => {
  const products = await productRepository().getAllProducts();
  return response.json(products);
};

routes.get("/getAllProducts", getAllProducts);

const getProductById = async (request: Request, response: Response) => {
  const { id } = request.query;

  if (typeof id !== "string")
    return response.json({ message: "Id should be a string" });

  const product = await productRepository().getProductById(id);

  return response.json(product);
};

routes.get("/getProductById", getProductById);

const getProductsByDescription = async (request: Request, response: Response) => {
  const { text } = request.query;

  if (typeof text !== "string")
    return response.json({ message: "Text should be a string" });

  const products = await productRepository().getProductsByDescription(text);
  return response.json(products);
};

routes.get("/getProductsByDescription", getProductsByDescription);
