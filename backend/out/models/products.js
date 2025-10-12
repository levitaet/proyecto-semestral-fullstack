"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    product_name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    id_author: { type: Number },
    images: { type: [String], default: [] },
}, {
    timestamps: true
});
const ProductModel = mongoose_1.default.model("Product", productSchema);
productSchema.set("toJSON", {
    transform: (_, returnedObject) => {
        var _a;
        returnedObject.id = (_a = returnedObject._id) === null || _a === void 0 ? void 0 : _a.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
exports.default = ProductModel;
