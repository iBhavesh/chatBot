import { body } from "express-validator";
import { User } from "../models";

export const registerValidator = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email")
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
    .isLength({
      min: 6,
    })
    .withMessage("Password must be at least 6 characters long."),
];

export const loginValidator = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password").notEmpty().withMessage("Password is required"),
];
