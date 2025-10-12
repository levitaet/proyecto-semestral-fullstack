"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DBNAME = process.env.MONGODB_DBNAME;
const JWT_SECRET = process.env.JWT_SECRET || "miclavesecreta";
const NODE_ENV = process.env.NODE_ENV;
exports.default = { PORT, HOST, MONGODB_URI, MONGODB_DBNAME, NODE_ENV, JWT_SECRET };
