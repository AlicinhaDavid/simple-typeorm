import { Router } from "express";
import { Request, Response } from "express";

export const routes = Router();

function helloWorld(request: Request, response: Response) {
  return response.json({ message: "Hello World!" });
}
routes.get("/", helloWorld);
