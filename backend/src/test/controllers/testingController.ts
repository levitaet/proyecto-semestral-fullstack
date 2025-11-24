import express from "express";
import UserModel from "../../models/users";
import PostModel from "../../models/posts";

const router = express.Router();

// Solo disponible en modo test
if (process.env.NODE_ENV === "test") {
  router.post("/reset", async (_request, response) => {
    try {
      await UserModel.deleteMany({});
      await PostModel.deleteMany({});
      response.status(204).end();
    } catch (error) {
      console.error("Error resetting database:", error);
      response.status(500).json({ error: "Error resetting database" });
    }
  });
}

export default router;
