import express from 'express';
import { deleteUser, editUser, getUserInfo } from '../controllers/about';
import { isLoggedIn } from '../helpers';

const router = express.Router();

router.get("/", getUserInfo)

router.put("/:about_id", isLoggedIn, editUser)

router.delete("/:about_id", isLoggedIn, deleteUser)

export default router;