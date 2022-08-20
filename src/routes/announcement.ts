import express from 'express';
import { createAnnouncement, deleteAnnouncement, editAnnouncement, fetchAllAnnouncements } from '../controllers/announcement';
import { isLoggedIn } from '../helpers';

const router = express.Router();

router.get("/", fetchAllAnnouncements)

router.post("/", isLoggedIn, createAnnouncement)

router.put("/:announcement_id", isLoggedIn, editAnnouncement)

router.delete("/:announcement_id", isLoggedIn, deleteAnnouncement)

export default router;