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

router.get("/", async (request, response) => {
  ProductModel.find<MongooseProduct>({}).then((products) => {
    response.json(products);
  });
});

router.get("/:id", async (request, response) => {
  const { id } = request.params;
  const product: MongooseProduct | null = await ProductModel.findById<MongooseProduct>(id);
  if (!product) {
    return response.status(404).json({ error: "Product not found" });
  }
  response.json(product);
});


router.post("/", upload.array("images", 5), async (request, response) => {
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

// Usar con precaución, elimina todos los productos
router.delete("/all", async (req, res) => {
  try {
    await ProductModel.deleteMany({});
    res.status(200).json({ message: "Todos los productos fueron eliminados correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar los productos" });
  }
});

export default router