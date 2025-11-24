import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import config from "./utils/config";
import middleware from "./middleware/middleware";
import userRouter from "./controllers/userController";
import postsRouter from "./controllers/postController";
import path from "path";
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
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-CSRF-Token'],  
  exposedHeaders: ['X-CSRF-Token']  
}));
app.use(cookieParser());
app.use(express.static("out"));

app.use(express.json());

app.use(middleware.requestLogger);
app.use("/api/users", userRouter);
app.use("/api/posts", postsRouter);
app.use("/api/login", loginRouter);
app.use("/api/uploads", express.static(path.join(__dirname, "../uploads")));


app.use(middleware.errorHandler);

if (config.NODE_ENV === "production") {
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
}
export default app;