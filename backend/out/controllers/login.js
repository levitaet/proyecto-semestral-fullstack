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
const users_1 = __importDefault(require("../models/users"));
const middleware_1 = require("../middleware/middleware");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../utils/config"));
const crypto_1 = __importDefault(require("crypto"));
const router = express_1.default.Router();
router.post("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = request.body;
    const user = yield users_1.default.findOne({ username });
    if (user) {
        const passwordCorrect = yield bcrypt_1.default.compare(password, user.passwordHash);
        if (!passwordCorrect) {
            response.status(401).json({
                error: "invalid username or password",
            });
        }
        else {
            const userForToken = {
                username: user.username,
                csrf: crypto_1.default.randomUUID(),
                id: user._id,
            };
            const token = jsonwebtoken_1.default.sign(userForToken, config_1.default.JWT_SECRET, {
                expiresIn: 60 * 60,
            });
            response.setHeader("X-CSRF-Token", userForToken.csrf);
            response.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            });
            response.status(200).send({ username: user.username });
        }
    }
    else {
        response.status(401).json({
            error: "invalid username or password",
        });
    }
}));
router.get("/me", middleware_1.withUser, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { body, userId } = request;
    const user = yield users_1.default.findById(userId);
    response.status(200).json(user);
}));
exports.default = router;
