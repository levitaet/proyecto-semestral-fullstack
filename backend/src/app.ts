import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import config from "./utils/config";
import middleware from "./middleware/middleware";
import userRouter from "./controllers/userController";
import postsRouter from "./controllers/postController";
import loginRouter from "./controllers/loginController";

const app = express();

mongoose.set("strictQuery", false);
if (config.MONGODB_URI) {
  mongoose.connect(config.MONGODB_URI).catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
}

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true}));
app.use(cookieParser());
app.use(express.static("out"));
app.use(express.json());

app.use(middleware.requestLogger);
app.use("/api/users", userRouter);
app.use("/api/posts", postsRouter);
app.use("/api/login", loginRouter);

app.use(middleware.errorHandler);
export default app;