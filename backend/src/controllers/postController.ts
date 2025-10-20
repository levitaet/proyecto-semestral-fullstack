import express, {Request, Response} from "express"
import PostModel, { CATEGORIES } from '../models/posts';
import type { MongoosePost } from  "../models/posts";
import BASE_URL from "../utils/config";
import path from "path";
import multer from "multer";
import { withUser } from "../middleware/middleware";
import UserModel from "../models/users";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, path.join(__dirname, "../../uploads/"));
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
router.post("/", withUser, upload.single("file"), async (request: Request, response: Response) => {
  const { title, product_name, description, price, tags, category, location, availability, stock } = request.body;
  
  if (!title || !product_name || !description || !price || !location || !category) {
    return response.status(400).json({ error: "Missing required fields" });
  }

  const imagePath = request.file
      ? `/uploads/${request.file.filename}`
      : `${BASE_URL}/api/uploads/no-image.png`;
  console.log("Received image file:", request.file);
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
    image: imagePath
  });

  console.log("Saving post with image in path:", imagePath);

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

// Upload de imágenes
// router.post("/api/upload", upload.single("file"), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).send({ message: "No se envió ningún archivo" });
//   }

//   // Guardar info en Mongo (opcional)
//   const file = new FileModel({
//     name: req.file.filename,
//     url: `${BASE_URL}/uploads/${req.file.filename}`,
//   });
//   await file.save();

//   res.status(200).send({ message: "Imagen subida correctamente", file });
// });

// GET todas las imagenes disponibles
// router.get("/api/uploads", async (request, response) => {
//   try {
//     let imagesPaths: string[] = [];
//     PostModel.find<MongoosePost>({}).then((posts) => {
//       posts.forEach((post) => {
//         if (post.image && post.image !== "") {
//           imagesPaths.push(post.image);
//         }
//       });
//       return response.json(imagesPaths);
//     });
//   } catch (error) {
//     console.error('Error fetching images paths:', error);
//     response.status(500).json({ error: 'An error occurred while fetching images paths.' });
//   }
// });

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