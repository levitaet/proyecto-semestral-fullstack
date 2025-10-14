import express from "express"
import bcrypt from "bcrypt";
import UserModel from "../models/users";
import type { MongooseUser } from  "../models/users";

const router = express.Router();


router.get("/", (request, response) => {
  UserModel.find<MongooseUser>({}).then((users) => {
    response.json(users);
  });
});

router.post("/", async (request, response) => {
  const { username, email, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const user = new UserModel({
    username,
    email,
    passwordHash
  });

  if(emailRegex.test(email)) {
    const savedUser = await user.save();
    
    response.status(201).json(savedUser);
  } else {
    return response.status(401).json({error: "Invalid Email"});
  };

})

// Usar con precaución, elimina todos los usuarios
router.delete("/all", async (req, res) => {
  try {
    await UserModel.deleteMany({});
    res.status(200).json({ message: "Todos los usuarios fueron eliminados correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar los usuarios" });
  }
});

export default router