"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    posts: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
}, {
    timestamps: true
});
userSchema.set("toJSON", {
    transform: (_, returnedObject) => {
        var _a;
        returnedObject.id = (_a = returnedObject._id) === null || _a === void 0 ? void 0 : _a.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
const UserModel = mongoose_1.default.model("User", userSchema);
exports.default = UserModel;
