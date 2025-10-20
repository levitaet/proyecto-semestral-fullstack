import express, { NextFunction, Request, Response} from "express"
import bcrypt from "bcrypt";
import UserModel from "../models/users";
import type { MongooseUser } from  "../models/users";

const router = express.Router();

router.get("/", (request: Request, response: Response) => {
  UserModel.find<MongooseUser>({}).then((users) => {
    response.json(users);
  });
});

router.get("/:id", async (request: Request, response: Response) => {
  const { id } = request.params;
  const user: MongooseUser | null = await UserModel.findById<MongooseUser>(id);
  if (!user) {
    return response.status(404).json({ error: "User not found" });
  }
  response.json(user);
});

router.post("/", async (request: Request, response: Response, next: NextFunction) => {
  const { username, email, password } = request.body;

  if (!username || !email || !password) {
    return response.status(400).json({ error: "Missing required fields" });
  }

  if (username.length < 3) {
    return response.status(400).json({ error: "Username must be at least 3 characters" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return response.status(400).json({ error: "Invalid Email" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new UserModel({
    username,
    email,
    passwordHash
  });

  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
    return response.status(500).json({ error: "Error creating user" });
  }
});

router.delete("/all", async (req: Request, res: Response) => {
  try {
    await UserModel.deleteMany({});
    res.status(200).json({ message: "Todos los usuarios fueron eliminados correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar los usuarios" });
  }
});

export default router