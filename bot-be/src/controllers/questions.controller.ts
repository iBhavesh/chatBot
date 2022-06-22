import axios from "axios";
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
  try {
    const { id } = req.params;
    let user: any = {};
    let stock: any = {};
    let mf: any = {};
    let fd: any = {};
    if (req.query.userId) {
      user = (
        await axios.get(`http://172.17.0.1:4000/user/${req.query.userId}`)
      ).data;
    }
    if (req.query.singleStock) {
      stock = (
        await axios.get(
          `http://172.17.0.1:4000/stocks/${req.query.singleStock}`
        )
      ).data;
    }
    if (req.query.singleMF) {
      mf = (await axios.get(`http://172.17.0.1:4000/mf/${req.query.singleMF}`))
        .data;
    }
    if (req.query.singleFD) {
      fd = (await axios.get(`http://172.17.0.1:4000/fd/${req.query.singleFD}`))
        .data;
    }
    const question = await Question.findById(id).lean();
    if (!question)
      return res.status(404).json({ message: "Question not found" });
    if (question.isDynamic) {
      const func = new Function(
        "user",
        "stock",
        "mf",
        "fd",
        "return '" + question?.answer + "'"
      );
      question.answer = func(user, stock, mf, fd);
    }
    return res.status(200).json(question);
  } catch (error) {
    console.log(error);
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
  try {
    const { path } = req.query;
    const evalCondition: string[] = [""];
    const specialCategory: string[] = ["all"];
    let user: any = {};
    if (req.query.userId) {
      user = (
        await axios.get(`http://172.17.0.1:4000/user/${req.query.userId}`)
      ).data;
      if (user.kyc_status === "COMPLETED") {
        evalCondition.push(EVAL_CONDITION.KYC_IS_COMPLETE);
      } else {
        evalCondition.push(EVAL_CONDITION.KYC_NOT_COMPLETE);
      }
      evalCondition.push(EVAL_CONDITION.USER_LOGGED_IN);
    } else {
      evalCondition.push(EVAL_CONDITION.USER_NOT_LOGGED_IN);
    }
    if (req.query.singleStock) {
      console.log("SS");
      specialCategory.push("singleStock");
    }

    const categories = await Category.find({
      $or: [{ path: path }, { name: { $in: specialCategory } }],
    }).distinct("_id");
    if (categories.length > 0) {
      const questions = await Question.find(
        {
          $and: [
            { categoryId: { $in: categories } },
            {
              $or: [
                { evalCondition: { $in: evalCondition } },
                { evalCondition: { $size: 0 } },
              ],
            },
          ],
        },
        {
          question: 1,
        }
      )
        .sort({ frequency: -1 })
        .lean();
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
