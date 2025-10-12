"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./utils/config"));
const middleware_1 = __importDefault(require("./middleware/middleware"));
const userController_1 = __importDefault(require("./controllers/userController"));
const productController_1 = __importDefault(require("./controllers/productController"));
const postController_1 = __importDefault(require("./controllers/postController"));
const app = (0, express_1.default)();
mongoose_1.default.set("strictQuery", false);
if (config_1.default.MONGODB_URI) {
    mongoose_1.default.connect(config_1.default.MONGODB_URI).catch((error) => {
        console.log("error connecting to MongoDB:", error.message);
    });
}
app.use((0, cors_1.default)());
app.use(express_1.default.static("out"));
app.use(express_1.default.json());
app.use("/api/users", userController_1.default);
app.use("/api/products", productController_1.default);
app.use("/api/posts", postController_1.default);
app.use(middleware_1.default.requestLogger);
app.use(middleware_1.default.errorHandler);
exports.default = app;
