import express from 'express';
import { createService, editService, deleteService } from '../controllers/service';
import { isLoggedIn } from '../helpers';

const router = express.Router({ mergeParams: true })

router.post("/", isLoggedIn, createService)

router.put("/:service_id", isLoggedIn, editService)

router.delete("/:service_id", isLoggedIn, deleteService)

export default router;