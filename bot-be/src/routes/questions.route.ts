import { Router } from "express";
import {
  addQuestion,
  getQuestion,
  getQuestions,
  updateFrequency,
} from "../controllers";
import { addQuestionValidator, getQuestionsValidator } from "../validators";
import { router } from "./index";

export const questionRouter = Router();

questionRouter.get("/question/:id", getQuestion);
questionRouter.get("/questions/all", getQuestionsValidator, getQuestions);
questionRouter.post("/question", addQuestionValidator, addQuestion);
questionRouter.patch("/question/:id/increase", updateFrequency);
