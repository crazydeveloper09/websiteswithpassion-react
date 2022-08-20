import express from 'express';
import { createComment, deleteComment } from '../controllers/comment';
import { isLoggedIn } from '../helpers';

const router = express.Router();

router.post("/", createComment)

router.delete("/:comment_id", isLoggedIn, deleteComment)

export default router;