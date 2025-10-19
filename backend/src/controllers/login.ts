import express, { Request } from "express";
import User from "../models/users";
import { withUser } from "../middleware/middleware";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../utils/config";
import crypto from "crypto";

const router = express.Router();

// LOGIN
router.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  if (user) {
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!passwordCorrect) {
      response.status(401).json({
        error: "invalid username or password",
      });
    } else {
      const userForToken = {
        username: user.username,
        csrf: crypto.randomUUID(),
        id: user._id,
      };

      const token = jwt.sign(userForToken, config.JWT_SECRET, {
        expiresIn: 60 * 60,
      });
      response.setHeader("x-csrf-token", userForToken.csrf);
      response.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      response.status(200).send({ username: user.username });
    }
  } else {
    response.status(401).json({
      error: "invalid username or password",
    });
  }
});

router.get("/me", withUser, async (request: Request & { userId?: string }, response) => {
  const { body, userId } = request;
  const user = await User.findById(userId);
  response.status(200).json(user);
});

export default router;