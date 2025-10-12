"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./utils/config"));
const PORT = config_1.default.PORT;
const HOST = config_1.default.HOST;
app_1.default.listen(Number(PORT), () => {
    console.log(`Server running on ${HOST}:${PORT}`);
});
