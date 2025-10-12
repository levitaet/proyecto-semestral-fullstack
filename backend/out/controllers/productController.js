"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("../models/products"));
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, "uploads/");
    },
    filename: function (_req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
router.get("/", upload.array("images", 5), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    products_1.default.find({}).then((products) => {
        response.json(products);
    });
}));
router.post("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_name, description, price, id_author } = request.body;
    if (!product_name || !description || !price) {
        return response.status(400).json({ error: "Missing required fields" });
    }
    const files = Array.isArray(request.files) ? request.files : [];
    const imagePaths = files.map((file) => file.path);
    const product = new products_1.default({
        product_name,
        description,
        price,
        id_author,
        images: imagePaths
    });
    try {
        const savedProduct = yield product.save();
        response.status(201).json(savedProduct);
    }
    catch (error) {
        console.error('Error saving product:', error);
        response.status(500).json({ error: 'An error occurred while saving the product.' });
    }
}));
exports.default = router;
