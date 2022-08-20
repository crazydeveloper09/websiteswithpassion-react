"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const achievement_1 = require("../controllers/achievement");
const helpers_1 = require("../helpers");
const router = express_1.default.Router({ mergeParams: true });
router.get("/", achievement_1.fetchAllUserAchievements);
router.post("/", helpers_1.upload.single("picture"), achievement_1.createAchievement);
router.post("/:achievement_id/edit/picture", helpers_1.upload.single("picture"), achievement_1.editAchievementMainPicture);
router.put("/:achievement_id", helpers_1.isLoggedIn, achievement_1.editAchievement);
router.delete("/:achievement_id", helpers_1.isLoggedIn, achievement_1.deleteAchievement);
exports.default = router;
