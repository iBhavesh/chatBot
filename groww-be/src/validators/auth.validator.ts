import { body } from "express-validator";
import { User } from "../models";

export const registerValidator = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email_id")
    .isEmail()
    .withMessage("Email must be valid")
    .normalizeEmail()
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email_id: value });
      if (user) {
        return Promise.reject("Email already exists");
      }
    }),
  body("password")
    .isStrongPassword({
      minLength: 8,
    })
    .withMessage("Password must be at least 8 characters long."),
];

export const loginValidator = [
  body("email_id").isEmail().withMessage("Email must be valid"),
  body("password").notEmpty().withMessage("Password is required"),
];
