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
exports.withUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../utils/config"));
const requestLogger = (request, response, next) => {
    console.log("Method:", request.method);
    console.log("Path:  ", request.path);
    console.log("Body:  ", request.body);
    console.log("---");
    next();
};
const errorHandler = (error, request, response, next) => {
    console.error('Error:', error.message);
    if (error.name === "CastError") {
        return response.status(400).json({ error: "ID mal formateado" });
    }
    if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    }
    if (error.code === 11000) {
        return response.status(400).json({
            error: "El username o email ya está registrado"
        });
    }
    if (error.name === "JsonWebTokenError") {
        return response.status(401).json({ error: "Token inválido" });
    }
    if (error.name === "TokenExpiredError") {
        return response.status(401).json({ error: "Token expirado" });
    }
    response.status(500).json({ error: "Error interno del servidor" });
};
const withUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const authReq = req;
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
        if (!token) {
            res.status(401).json({ error: "missing token" });
        }
        else {
            const decodedToken = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
            const csrfToken = req.headers["x-csrf-token"];
            if (typeof decodedToken === "object" &&
                decodedToken.id &&
                decodedToken.csrf == csrfToken) {
                authReq.userId = decodedToken.id;
                next();
            }
            else {
                res.status(401).json({ error: "invalid token" });
            }
        }
    }
    catch (error) {
        res.status(401).json({ error: "invalid token" });
    }
});
exports.withUser = withUser;
exports.default = { requestLogger, errorHandler, withUser: exports.withUser };
