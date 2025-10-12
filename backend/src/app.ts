import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./utils/config";

const app = express();

mongoose.set("strictQuery", false);
if (config.MONGODB_URI) {
  mongoose.connect(config.MONGODB_URI).catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
}


export default app;
