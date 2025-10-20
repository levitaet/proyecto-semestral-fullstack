import express, { Request } from "express";
import User from "../models/users";
import { withUser } from "../middleware/middleware";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../utils/config";
import crypto from "crypto";

const router = express.Router();

router.post("/", async (request, response) => {
  const { username, password } = request.body;

  if (!username || !password) {
    return response.status(400).json({
      error: "Username and password are required",
    });
  }

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
        expiresIn: 60 * 60, // 1 hora
      });
      response.setHeader("X-CSRF-Token", userForToken.csrf);
      response.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      response.status(200).send({ 
        username: user.username,
        email: user.email,
        id: user._id
      });
    }
  } else {
    response.status(401).json({
      error: "invalid username or password",
    });
  }
});

router.get("/me", withUser, async (request: Request, response) => {
  const user = await User.findById(request.userId);
  if (!user) {
    return response.status(404).json({ error: "User not found" });
  }
  response.status(200).json(user);
});

router.post("/logout", (request, response) => {
  response.clearCookie("token");
  response.status(200).send({
    message: "Logged out successfully"
  });
});

export default router;