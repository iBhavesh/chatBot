import { Router } from "express";
import {
  addQuestion,
  getEvalCondition,
  getQuestion,
  getQuestions,
  getAllQuestions,
  updateFrequency,
  deleteQuestion,
} from "../controllers";
import { addQuestionValidator } from "../validators";

export const questionRouter = Router();

questionRouter.get("/question/:id", getQuestion);
questionRouter.get("/questions/all", getAllQuestions);
questionRouter.post("/question", addQuestionValidator, addQuestion);
questionRouter.patch("/question/:id/increase", updateFrequency);
questionRouter.get("/questions", getQuestions);
questionRouter.get("/questions/filters", getEvalCondition);
questionRouter.delete("/questions/:id", deleteQuestion);
