"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const about_1 = require("../controllers/about");
const helpers_1 = require("../helpers");
const router = express_1.default.Router();
router.get("/", about_1.getUserInfo);
router.put("/:about_id", helpers_1.isLoggedIn, about_1.editUser);
router.delete("/:about_id", helpers_1.isLoggedIn, about_1.deleteUser);
exports.default = router;
