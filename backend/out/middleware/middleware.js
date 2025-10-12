"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = { requestLogger, errorHandler };
