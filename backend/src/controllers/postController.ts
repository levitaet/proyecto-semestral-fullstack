import express from "express"
import PostModel from '../models/posts';
import type { MongoosePost } from  "../models/posts";
import TagsModel from '../models/tags';
import type { MongooseTags } from "../models/tags";


const router = express.Router();

router.get("/", (request, response) => {
  PostModel.find<MongoosePost>({}).then((posts) => {
    response.json(posts);
  });
});

// GET tags
router.get("/tags", (request, response) => {
  TagsModel.find<MongooseTags>({}).then((tags) => {
    response.json(tags);
  });
});

router.post("/", async (request, response) => {
  const { product_id, author_id, createdAt, updatedAt, tag, location, availability, stock } = request.body;
  
  if (!product_id || !location || !author_id) {
    return response.status(400).json({ error: "Missing required fields" });
  }

  if (tag) {
    const existingTag = await TagsModel.findOne({ name: tag });
    if (!existingTag) {
      await TagsModel.create({ name: tag });
    }
  }
  
  const post = new PostModel({
    product_id,
    author_id,
    createdAt,
    updatedAt,
    tag,
    location,
    availability,
    stock
  });

  const savedPost = await post.save()
    .then((savedPost) => {
      response.status(201).json(savedPost);
    })
    .catch((error) => {
      console.error('Error saving post:', error);
      response.status(500).json({ error: 'An error occurred while saving the post.' });
    });
});

// POST tag (directamente)
router.post("/tags", async (request, response) => {
  const { name } = request.body;
  if (!name) {
    return response.status(400).json({ error: "Tag name is required" });
  }
  const existingTag = await TagsModel.findOne({ name });
  if (existingTag) {
    return response.status(400).json({ error: "Tag already exists" });
  }
  const tag = new TagsModel({ name });
  const savedTag = await tag.save()
    .then((savedTag) => {
      response.status(201).json(savedTag);
    })
    .catch((error) => {
      console.error('Error saving tag:', error);
      response.status(500).json({ error: 'An error occurred while saving the tag.' });
    });
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