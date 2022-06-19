import { Router } from "express";
import { populateFD,getAllFD,getFD,buyFD } from "../controllers";
import { fdOrderValidator } from "../validators";

export const fdRouter = Router();

fdRouter.get("/",getAllFD);
fdRouter.get("/populate",populateFD);

fdRouter.get("/:id", getFD);
fdRouter.post("/:id/buy", fdOrderValidator, buyFD);

