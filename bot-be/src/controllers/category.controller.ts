import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { Category, Question } from "../models";
import { DYNAMIC_OPTIONS } from "../utils/constants";
import { getQuestions } from "./questions.controller";

export const getAllCategory: RequestHandler = async (req, res) => {
  try {
    const category = await Category.find().lean();
    return res.status(200).json(category);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const addCategory: RequestHandler = async (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const parentCategory = await Category.findById(req.body.parent);
    if (!parentCategory) {
      return res.status(400).send("Parent category not found");
    }
    const questions = await Question.find({ category: req.body.parent }).lean();
    if (questions.length > 0) {
      return res
        .status(400)
        .send(
          "A Category can't have child categories if the category has questions"
        );
    }
    const category = await Category.create({
      ...req.body,
      path: parentCategory.path + "->" + req.body.name,
    });
    parentCategory.isLeafNode = false;
    await parentCategory.save();

    return res.status(201).json(category);
  } catch (error: any) {
    if (error && error.code && error.code === 11000) {
      return res.status(400).send("Category already exists");
    }
    return res.status(400).json(error);
  }
};

export const deleteCategory: RequestHandler = async (req, res) => {
  try {
    const root = await Category.findOne({ name: "root" });
    if (root?.id === req.params.id) {
      return res.status(400).send("Cannot delete root category");
    }
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(400).send("Category not found");
    }
    const re = new RegExp(category.path, "g");
    const categoryIds = await Category.find({ path: { $regex: re } }).distinct(
      "_id"
    );
    await Question.deleteMany({ categoryId: { $in: categoryIds } });
    await Category.deleteMany({ _id: { $in: categoryIds } });
    return res.sendStatus(200);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAllCategoryNames: RequestHandler = async (req, res) => {
  try {
    const categoryName = await Category.find().lean().select("path isLeafNode");
    return res.status(200).json(categoryName);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getDynamicOptions: RequestHandler = async (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    let options: string[] = [];
    const dynamicOptionsKeys = Object.keys(DYNAMIC_OPTIONS);
    if (
      req.query.evalCondition &&
      dynamicOptionsKeys.includes(req.query.evalCondition as string)
    ) {
      options = [
        ...DYNAMIC_OPTIONS[
          req.query.evalCondition as keyof typeof DYNAMIC_OPTIONS
        ],
      ];
    }
    if (
      req.query.path &&
      dynamicOptionsKeys.includes(req.query.path as string)
    ) {
      options = options.concat(
        DYNAMIC_OPTIONS[req.query.path as keyof typeof DYNAMIC_OPTIONS]
      );
    }
    return res.status(200).json(options);
  } catch (error) {
    return res.status(400).json(error);
  }
};
