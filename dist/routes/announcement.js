"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const announcement_1 = require("../controllers/announcement");
const helpers_1 = require("../helpers");
const router = express_1.default.Router();
router.get("/", announcement_1.fetchAllAnnouncements);
router.post("/", helpers_1.isLoggedIn, announcement_1.createAnnouncement);
router.put("/:announcement_id", helpers_1.isLoggedIn, announcement_1.editAnnouncement);
router.delete("/:announcement_id", helpers_1.isLoggedIn, announcement_1.deleteAnnouncement);
exports.default = router;
