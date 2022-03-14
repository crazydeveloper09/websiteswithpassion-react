import express from 'express';
import { checkStatusOrder, createOrder, deleteOrder, editOrder, fetchAllOrders, sendOfferOrder } from '../controllers/orders';
import { isLoggedIn } from '../helpers';

const router = express.Router();

router.get("/", fetchAllOrders)
router.get("/check-status", checkStatusOrder)

router.post("/", createOrder)
router.post("/:order_id/send", isLoggedIn, sendOfferOrder)

router.put("/:order_id", isLoggedIn, editOrder)

router.delete("/:order_id", isLoggedIn, deleteOrder)

export default router;