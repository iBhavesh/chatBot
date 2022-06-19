import { Router } from "express";
import passport from "passport";
import { authRouter } from "./auth.route";
import { stockRouter } from "./stock.route";
import { userRouter } from "./user.route";
import { fdRouter } from "./fd.route";
import { mfRouter } from "./mf.route";


export const router = Router();

// Stock Router
router.use("/auth", authRouter);

// router.use(passport.authenticate("jwt", { session: false }));
router.use("/stocks", stockRouter);
router.use("/user", userRouter);
router.use("/mf",mfRouter);
router.use("/fd",fdRouter);

router.use("*", (req, res) => {
  return res.status(404).send("Route not found");
});
