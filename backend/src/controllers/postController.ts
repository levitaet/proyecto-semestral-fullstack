import express, {Request, Response} from "express"
import PostModel, { CATEGORIES } from '../models/posts';
import type { MongoosePost } from  "../models/posts";
import multer from "multer";
import { withUser } from "../middleware/middleware";
import UserModel from "../models/users";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (_req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

// GET todos los posts
router.get("/", (request, response) => {
  PostModel.find<MongoosePost>({}).then((posts) => {
    response.json(posts);
  });
});

// GET todas las categorías disponibles
router.get("/categories", async (request, response) => {
  try {
    response.json(CATEGORIES);
  } catch (error) {
    console.error('Error fetching categories:', error);
    response.status(500).json({ error: 'An error occurred while fetching categories.' });
  }
});

// GET un post por ID
router.get("/:id", async (request, response) => {
  const { id } = request.params;
  const post: MongoosePost | null = await PostModel.findById<MongoosePost>(id);
  if (!post) {
    return response.status(404).json({ error: "Post not found" });
  }
  response.json(post);
});


// POST crear un nuevo post (requiere autenticación)
router.post("/", withUser, upload.array("images", 5), async (request: Request, response: Response) => {
  const { title, product_name, description, price, tags, category, location, availability, stock } = request.body;
  
  if (!title || !product_name || !description || !price || !location || !category) {
    return response.status(400).json({ error: "Missing required fields" });
  }

  const files = Array.isArray(request.files) ? request.files as Express.Multer.File[] : [];
  const imagePaths = files.map((file) => file.path);

  const parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags || [];

  const user = await UserModel.findById(request.userId);
  if (!user) {
    return response.status(404).json({ error: "User not found" });
  }
  
  const post = new PostModel({
    title,
    product_name,
    description,
    price: Number(price),
    author_name: user.username,
    tags: parsedTags,
    category,
    location,
    availability,
    stock,
    images: imagePaths
  });

  try {
    const savedPost = await post.save();
    
    user.posts.push(savedPost._id);
    await user.save();
    
    response.status(201).json(savedPost);
  } catch (error) {
    console.error('Error saving post:', error);
    response.status(500).json({ error: 'An error occurred while saving the post.' });
  }
});

// Usar con precaución, elimina todos los posts
router.delete("/all", async (req, res) => {
  try {
    await PostModel.deleteMany({});
    res.status(200).json({ message: "Todos los posts fueron eliminados correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar los posts" });
  }
});

export default router