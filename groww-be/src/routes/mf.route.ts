import { Router } from "express";
import { populateMF,getAllMF,getMF,buyMF } from "../controllers";
import { mfOrderValidator } from "../validators";

export const mfRouter = Router();

mfRouter.get("/",getAllMF);
mfRouter.get("/populate",populateMF);

mfRouter.get("/:id", getMF);
mfRouter.post("/:id/buy", mfOrderValidator, buyMF);