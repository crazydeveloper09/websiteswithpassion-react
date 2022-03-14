"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const project_1 = require("../controllers/project");
const helpers_1 = require("../helpers");
const router = express_1.default.Router();
router.get("/", project_1.fetchAllProjects);
router.post("/", helpers_1.upload.single("profile"), project_1.createProject);
router.post("/:project_id/edit/picture", helpers_1.upload.single("picture"), project_1.editProjectMainPhoto);
router.post("/:project_id/add/picture", helpers_1.upload.single("picture"), project_1.addPictureToProjectGallery);
router.put("/:project_id", helpers_1.isLoggedIn, project_1.editProject);
router.delete("/:project_id", helpers_1.isLoggedIn, project_1.deleteProject);
exports.default = router;
