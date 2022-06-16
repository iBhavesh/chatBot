import { Router } from "express";
import passport from "passport";

import { categoryRouter } from "./category.route";
import { questionRouter } from "./questions.route";

import "../utils/auth";

export const router = Router();

// router.use(passport.authenticate("jwt", { session: false }));

router.use(categoryRouter);
router.use(questionRouter);

router.use("/", function (req, res) {
  res.status(404).send("Route does not exist");
});
