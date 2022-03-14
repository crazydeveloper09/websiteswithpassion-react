import express from 'express';
import { addPictureToProjectGallery, createProject, deleteProject, editProject, editProjectMainPhoto, fetchAllProjects } from '../controllers/project';
import { isLoggedIn, upload } from '../helpers';

const router = express.Router();

router.get("/", fetchAllProjects)

router.post("/", upload.single("profile"), createProject)

router.post("/:project_id/edit/picture", upload.single("picture"), editProjectMainPhoto)

router.post("/:project_id/add/picture", upload.single("picture"), addPictureToProjectGallery)

router.put("/:project_id", isLoggedIn, editProject)

router.delete("/:project_id", isLoggedIn, deleteProject)

export default router;