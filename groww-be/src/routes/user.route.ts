import { Router } from "express";
import { getUser, patchOrderLimit } from "../controllers";
import { orderLimitValidator } from "../validators";

export const userRouter = Router();

userRouter.get("/:id", getUser);
userRouter.patch("/:id/order_limit", orderLimitValidator, patchOrderLimit);
