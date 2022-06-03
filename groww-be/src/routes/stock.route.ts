import { Router } from "express";
import { buyStock, getAllStocks, getStock } from "../controllers";
import { stockOrderValidator } from "../validators";

export const stockRouter = Router();

stockRouter.get("/", getAllStocks);
stockRouter.get("/:id", getStock);
stockRouter.post("/:id/buy", stockOrderValidator, buyStock);
