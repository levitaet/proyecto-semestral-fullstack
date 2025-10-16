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
const posts_1 = __importDefault(require("../models/posts"));
const router = express_1.default.Router();
router.get("/", (request, response) => {
    posts_1.default.find({}).then((posts) => {
        response.json(posts);
    });
});
router.post("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id, author_id, createdAt, updatedAt, tag, location, availability, stock } = request.body;
    if (!product_id || !location || !author_id) {
        return response.status(400).json({ error: "Missing required fields" });
    }
    const post = new posts_1.default({
        product_id,
        author_id,
        createdAt,
        updatedAt,
        tag,
        location,
        availability,
        stock
    });
    const savedPost = yield post.save()
        .then((savedPost) => {
        response.status(201).json(savedPost);
    })
        .catch((error) => {
        console.error('Error saving post:', error);
        response.status(500).json({ error: 'An error occurred while saving the post.' });
    });
}));
// Usar con precaución, elimina todos los posts
router.delete("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield posts_1.default.deleteMany({});
        res.status(200).json({ message: "Todos los posts fueron eliminados correctamente" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar los posts" });
    }
}));
exports.default = router;
