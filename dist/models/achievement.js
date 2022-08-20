"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const achievementsSchema = new mongoose_1.default.Schema({
    title: String,
    titleEn: String,
    picture: String
});
exports.default = mongoose_1.default.model("Achievement", achievementsSchema);
