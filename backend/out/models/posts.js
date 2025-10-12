"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_js_1 = __importDefault(require("../utils/config.js"));
const url = config_js_1.default.MONGODB_URI;
const dbName = config_js_1.default.MONGODB_DBNAME;
mongoose_1.default.set("strictQuery", false);
if (url) {
    mongoose_1.default.connect(url, { dbName }).catch((error) => {
        console.log("error connecting to MongoDB:", error.message);
    });
}
const postSchema = new mongoose_1.default.Schema({
    product_id: { type: String, required: true },
    author_id: { type: Number },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    tag: { type: String },
    location: { type: String, required: true },
    availability: { type: Boolean, default: true },
    stock: { type: Number }
}, {
    timestamps: true
});
const PostModel = mongoose_1.default.model("Post", postSchema);
postSchema.set("toJSON", {
    transform: (_, returnedObject) => {
        var _a;
        returnedObject.id = (_a = returnedObject._id) === null || _a === void 0 ? void 0 : _a.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
exports.default = PostModel;
