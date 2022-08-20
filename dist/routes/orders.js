"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_1 = require("../controllers/orders");
const helpers_1 = require("../helpers");
const router = express_1.default.Router();
router.get("/", orders_1.fetchAllOrders);
router.get("/check-status", orders_1.checkStatusOrder);
router.post("/", orders_1.createOrder);
router.post("/:order_id/send", helpers_1.isLoggedIn, orders_1.sendOfferOrder);
router.put("/:order_id", helpers_1.isLoggedIn, orders_1.editOrder);
router.delete("/:order_id", helpers_1.isLoggedIn, orders_1.deleteOrder);
exports.default = router;
