import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { User } from "../models";

export const getUser: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error);
  }
  return res.status(500).send("Internal server error");
};

export const patchOrderLimit: RequestHandler = async (req, res) => {
  const errors = validationResult(req.body).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).send(errors.mapped());
  }
  const { id } = req.params;
  const { order_limit } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { order_limit },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error);
  }
};
