import { log } from "console";
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
    req.body.answer = req.body.answer.replace("{", "'+").replace("}", "+'");
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
    const question = await Question.findById(id).lean();
    return res.status(200).json(question);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAllQuestions: RequestHandler = async (req, res) => {
  try {
    const questions = await Question.find().populate("categoryId");
    return res.status(200).json(questions);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export const getEvalCondition: RequestHandler = (req, res) => {
  return res.status(200).json({
    data: Object.values(EVAL_CONDITION),
  });
};

export const getQuestions: RequestHandler = async (req, res) => {
  const { path } = req.query;
  try {
    const category = await Category.findOne({ path: path }).lean();
    if (category) {
      const questions = await Question.find({
        $or: [{categoryId: category._id,},{path:"all"}],
      }).sort({frequency:-1}).lean();
      return res.status(200).json(questions);
    }
    return res.status(400).send("Category not found");
  } catch (error) {
    console.log("error", error);

    return res.status(400).json(error);
  }
};

export const deleteQuestion: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    await Question.deleteOne({ _id: id });
    return res.status(200).json({ message: "Question deleted" });
  } catch (error) {
    return res.status(400).json(error);
  }
};
