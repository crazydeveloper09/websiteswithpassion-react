"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const projectSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    profile: String,
    status: String,
    link: String,
    subpageLink: String,
    pictures: Array,
    reviews: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    categories: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Category"
        }
    ],
    added: Date,
    edited: Date,
    en: String,
    statusEn: String
});
exports.default = mongoose_1.default.model("Project", projectSchema);
