import { body } from "express-validator";

export const fdOrderValidator =[
    body('amount').isInt({min:1}).withMessage('Amount must be positive number'),
]