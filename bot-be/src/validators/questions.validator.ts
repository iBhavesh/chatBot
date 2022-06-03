import { body, query } from "express-validator";

export const addQuestionValidator = [
  body("categoryId").isMongoId().withMessage("A Valid Category ID is required"),
  body("question")
    .isString()
    .withMessage("Question is required")
    .bail()
    .isLength({ min: 1 })
    .withMessage("Question is required"),
  body("answer")
    .isString()
    .withMessage("Answer is required")
    .bail()
    .isLength({ min: 1 })
    .withMessage("Answer is required"),
  body("isDynamic").isBoolean().withMessage("Is Dynamic is required"),
];

export const getQuestionsValidator = [
  query("categoryId")
    .isMongoId()
    .withMessage("A Valid Category ID is required"),
];
