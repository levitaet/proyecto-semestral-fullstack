import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../utils/config";

const requestLogger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const errorHandler = (
  error: {name: string; message: string; code?: number},
  request: Request,
  response: Response,
  next: NextFunction
) => {
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

export const withUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      res.status(401).json({ error: "missing token" });
    } else {
      const decodedToken = jwt.verify(token, config.JWT_SECRET);
      const csrfToken = req.headers["x-csrf-token"];
      if (
        typeof decodedToken === "object" &&
        decodedToken.id &&
        decodedToken.csrf == csrfToken
      ) {
        req.userId = decodedToken.id;
        next();
      } else {
        res.status(401).json({ error: "invalid token" });
      }
    }
  } catch (error) {
    res.status(401).json({ error: "invalid token" });
  }
};

export default { requestLogger, errorHandler, withUser };