import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./utils/config";
import middleware from "./middleware/middleware";
import userRouter from "./controllers/userController";
import productRouter from "./controllers/productController";
import postsRouter from "./controllers/postController";
import loginRouter from "./controllers/login";

const app = express();

mongoose.set("strictQuery", false);
if (config.MONGODB_URI) {
  mongoose.connect(config.MONGODB_URI).catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
}

app.use(cors());
app.use(express.static("out"));
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/posts", postsRouter);
app.use("/api/login", loginRouter);



app.use(middleware.requestLogger);
app.use(middleware.errorHandler);
export default app;
