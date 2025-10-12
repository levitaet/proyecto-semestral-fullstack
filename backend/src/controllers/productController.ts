import express from "express"
import ProductModel from '../models/products';
import type { MongooseProduct } from  "../models/products";
import multer from "multer";


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

router.get("/", upload.array("images", 5), async (request, response) => {
  ProductModel.find<MongooseProduct>({}).then((products) => {
    response.json(products);
  });
});

router.post("/", async (request, response) => {
  const { product_name, description, price, id_author } = request.body;
  if (!product_name || !description || !price) {
    return response.status(400).json({ error: "Missing required fields" });
  }

  const files = Array.isArray(request.files) ? request.files as Express.Multer.File[] : [];
  const imagePaths = files.map((file) => file.path);

  const product = new ProductModel({
    product_name,
    description,
    price,
    id_author,
    images: imagePaths
  });

  try {
    const savedProduct = await product.save();
    response.status(201).json(savedProduct);
  }
  catch (error) {
    console.error('Error saving product:', error);
    response.status(500).json({ error: 'An error occurred while saving the product.' });
  }
});

export default router