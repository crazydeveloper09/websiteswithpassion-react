import express from 'express';
import { createService, editService, deleteService, fetchAllServices } from '../controllers/service';
import { isLoggedIn } from '../helpers';

const router = express.Router({ mergeParams: true })

router.get("/", fetchAllServices)

router.post("/", isLoggedIn, createService)

router.put("/:service_id", isLoggedIn, editService)

router.delete("/:service_id", isLoggedIn, deleteService)

export default router;