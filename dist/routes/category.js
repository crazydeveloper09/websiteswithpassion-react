"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_1 = require("../controllers/category");
const helpers_1 = require("../helpers");
const router = express_1.default.Router();
router.get("/", category_1.fetchAllCategories);
router.post("/", helpers_1.isLoggedIn, category_1.createCategory);
router.post("/:category_id/add/project", helpers_1.isLoggedIn, category_1.addProjectToCategory);
router.put("/:category_id", helpers_1.isLoggedIn, category_1.editCategory);
router.delete("/:category_id", helpers_1.isLoggedIn, category_1.deleteCategory);
exports.default = router;
