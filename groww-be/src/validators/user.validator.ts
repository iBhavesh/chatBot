import { body } from "express-validator";

export const orderLimitValidator = [
    body("order_limit").isInt({ min: 0 }).withMessage("order_limit must be a number"),
]