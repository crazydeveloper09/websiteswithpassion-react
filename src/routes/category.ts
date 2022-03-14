import express from 'express';
import { addProjectToCategory, createCategory, deleteCategory, editCategory, fetchAllCategories } from '../controllers/category';
import { isLoggedIn } from '../helpers';

const router = express.Router();

router.get("/", fetchAllCategories)

router.post("/", isLoggedIn, createCategory)
router.post("/:category_id/add/project", isLoggedIn, addProjectToCategory)

router.put("/:category_id", isLoggedIn, editCategory)

router.delete("/:category_id", isLoggedIn, deleteCategory)

export default router;