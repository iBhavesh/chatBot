import { body, query } from "express-validator";

export const addCategoryValidator = [
  body("name").notEmpty().withMessage("Category name is required"),
  body("parent").notEmpty().withMessage("Parent category is required"),
];

export const dynamicOptionValidator = [
  query("path").notEmpty().withMessage("Path is required"),
];
