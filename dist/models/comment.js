"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    author: String,
    text: {
        type: String,
        required: true
    },
    written: {
        type: Date,
        default: Date.now()
    },
    project: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Project"
    },
    stars: Number
});
exports.default = mongoose_1.default.model("Comment", commentSchema);
