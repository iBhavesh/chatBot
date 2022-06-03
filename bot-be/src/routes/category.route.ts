import { Router } from "express";
import { addCategory, getAllCategory } from "../controllers";
import { addCategoryValidator } from "../validators";

export const categoryRouter = Router();

categoryRouter.get("/category", getAllCategory);
categoryRouter.post("/category",addCategoryValidator, addCategory);
