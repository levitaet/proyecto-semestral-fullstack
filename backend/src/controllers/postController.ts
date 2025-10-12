import express from "express"
import PostModel from '../models/posts';
import type { MongoosePost } from  "../models/posts";


const router = express.Router();

router.get("/", (request, response) => {
  PostModel.find<MongoosePost>({}).then((posts) => {
    response.json(posts);
  });
});

router.post("/", async (request, response) => {
  const { product_id, author_id, createdAt, updatedAt, tag, location, availability, stock } = request.body;
  
  if (!product_id || !location) {
    return response.status(400).json({ error: "Missing required fields" });
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

export default router