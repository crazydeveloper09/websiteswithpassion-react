import express from 'express';
import { createAchievement, deleteAchievement, editAchievement, editAchievementMainPicture } from '../controllers/achievement';
import { isLoggedIn, upload } from '../helpers';

const router = express.Router();

router.post("/", upload.single("picture"), createAchievement)
router.post("/:achievement_id/edit/picture", upload.single("picture"), editAchievementMainPicture)

router.put("/:achievement_id", isLoggedIn, editAchievement)

router.delete("/:achievement_id", isLoggedIn, deleteAchievement);

export default router;