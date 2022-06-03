import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { Category, Question } from "../models";
import { EVAL_CONDITION } from "../utils/constants";

export const addQuestion: RequestHandler = async (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    req.body.tags = req.body.question.split(" ");
    const question = await Question.create(req.body);
    return res.status(201).json(question);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const updateFrequency: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await Question.updateOne({ _id: id }, { $inc: { frequency: 1 } });
    return res.status(200).json({ message: "Frequency updated" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getQuestion: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findById(id);
    return res.status(200).json(question);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getQuestions: RequestHandler = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const ids = await Category.find({ parent: categoryId }).distinct("_id");
    const questions = await Question.find(
      { categoryId: { $in: ids } },
      {},
      {
        sort: {
          frequency: -1,
        },
      }
    );
    return res.status(200).json(questions);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getEvalCondition: RequestHandler = (req, res) => {
  return res.status(200).json({
    data: Object.values(EVAL_CONDITION),
  });
};
