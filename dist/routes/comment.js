"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_1 = require("../controllers/comment");
const helpers_1 = require("../helpers");
const router = express_1.default.Router();
router.post("/", comment_1.createComment);
router.delete("/:comment_id", helpers_1.isLoggedIn, comment_1.deleteComment);
exports.default = router;
