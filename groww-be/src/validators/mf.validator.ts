import { body } from "express-validator";

export const mfOrderValidator =[
    body('amount').isInt({min:1}).withMessage('Amount must be positive number'),
]