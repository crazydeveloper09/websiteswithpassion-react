import express from 'express';
import { createTechnology, editTechnology, deleteTechnology } from '../controllers/technology';
import { isLoggedIn } from '../helpers';

const router = express.Router({ mergeParams: true })

router.post("/", isLoggedIn, createTechnology)

router.put("/:technology_id", isLoggedIn, editTechnology)

router.delete("/:technology_id", isLoggedIn, deleteTechnology)

export default router;