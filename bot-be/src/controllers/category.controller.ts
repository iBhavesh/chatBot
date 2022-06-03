import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { Category } from "../models";

export const getAllCategory: RequestHandler = async (req, res) => {
  try {
    const category = await Category.find();
    return res.status(200).json(category);
  } catch (error) {}
};

export const addCategory: RequestHandler = async (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if(!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    await Category.updateOne(
      { _id: req.body.parent },
      { $set: { isLeafNode: false } }
    );

    const category = await Category.create(req.body);
    return res.status(201).json(category);
  } catch (error) {
    return res.status(400).json(error);
  }
};
