"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const technology_1 = require("../controllers/technology");
const helpers_1 = require("../helpers");
const router = express_1.default.Router({ mergeParams: true });
router.post("/", helpers_1.isLoggedIn, technology_1.createTechnology);
router.put("/:technology_id", helpers_1.isLoggedIn, technology_1.editTechnology);
router.delete("/:technology_id", helpers_1.isLoggedIn, technology_1.deleteTechnology);
exports.default = router;
