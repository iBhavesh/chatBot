import { body } from "express-validator";

export const stockOrderValidator =[
    body('quantity').isInt({min:1}).withMessage('Quantity must be a positive number'),
]