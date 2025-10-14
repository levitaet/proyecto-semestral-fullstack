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
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = __importDefault(require("../models/users"));
const router = express_1.default.Router();
router.get("/", (request, response) => {
    users_1.default.find({}).then((users) => {
        response.json(users);
    });
});
router.post("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = request.body;
    const saltRounds = 10;
    const passwordHash = yield bcrypt_1.default.hash(password, saltRounds);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const user = new users_1.default({
        username,
        email,
        passwordHash
    });
    if (emailRegex.test(email)) {
        const savedUser = yield user.save();
        response.status(201).json(savedUser);
    }
    else {
        return response.status(401).json({ error: "Invalid Email" });
    }
    ;
}));
router.delete("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield users_1.default.deleteMany({});
        res.status(200).json({ message: "Todos los usuarios fueron eliminados correctamente" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar los usuarios" });
    }
}));
exports.default = router;
