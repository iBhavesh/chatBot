import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors, { CorsOptions } from "cors";

import { router } from "./src/routes";

config();

const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.DB_URL;
const whiteList = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://hoppscotch.io",
  "https://groww-fe.vercel.app"
];

const corsOptions: CorsOptions = {
  origin(requestOrigin, callback) {
    if (!requestOrigin || whiteList.includes(requestOrigin)) {
      return callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

const server = app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "production")
    console.log(`Listening at port ${PORT}`);
});

if (MONGOURL)
  mongoose
    .connect(MONGOURL)
    .then(() => {
      if (process.env.NODE_ENV !== "production")
        console.log("Connected to Database");
    })
    .catch((err) => {
      console.log(err);
      server.close();
    });
