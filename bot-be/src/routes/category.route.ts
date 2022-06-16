import { Router } from "express";
import { addCategory, deleteCategory, getAllCategory, getAllCategoryNames, getDynamicOptions } from "../controllers";
import { addCategoryValidator, dynamicOptionValidator } from "../validators";

export const categoryRouter = Router();

categoryRouter.get("/category/all", getAllCategory);
categoryRouter.post("/category",addCategoryValidator, addCategory);
categoryRouter.delete("/category/:id", deleteCategory);
categoryRouter.get("/category/names",getAllCategoryNames);
categoryRouter.get("/category/dynamic-options",getDynamicOptions)
