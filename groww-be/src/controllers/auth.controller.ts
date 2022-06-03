import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models";

export const register: RequestHandler = async (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors });
  }
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email_id: req.body.email_id,
      password: password,
    });
    await user.save();
    const userJson = {
      _id: user._id,
      email: user.email_id,
    };
    return res.status(201).json(generateTokens(userJson));
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

export const login: RequestHandler = async (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors });
  }
  try {
    const user = await User.findOne({ email_id: req.body.email_id });
    if (!user) {
      return res.status(404).json({ errors: "User not found" });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ errors: "Invalid password" });
    }
    const userJson = {
      _id: user._id,
      email: user.email_id,
    };
    return res.status(200).json(generateTokens(userJson));
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};


const generateTokens = (payload: { [key: string]: string }) => {
  const accessToken = jwt.sign(
    { ...payload, type: "ACCESS_TOKEN" },
    process.env.SECRET_KEY!,
    {
      expiresIn: "1h",
    }
  );
  const refreshToken = jwt.sign(
    { ...payload, type: "REFRESH_TOKEN" },
    process.env.SECRET_KEY!,
    {
      expiresIn: "1h",
    }
  );
  return { accessToken, refreshToken };
};
