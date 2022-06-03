import { Router } from "express";
import { login, register } from "../controllers";
import { loginValidator, registerValidator } from "../validators";

export const authRouter = Router();

authRouter.post("/register", registerValidator, register);
authRouter.post("/login", loginValidator, login);
