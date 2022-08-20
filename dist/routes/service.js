"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const service_1 = require("../controllers/service");
const helpers_1 = require("../helpers");
const router = express_1.default.Router({ mergeParams: true });
router.get("/", service_1.fetchAllServices);
router.post("/", helpers_1.isLoggedIn, service_1.createService);
router.put("/:service_id", helpers_1.isLoggedIn, service_1.editService);
router.delete("/:service_id", helpers_1.isLoggedIn, service_1.deleteService);
exports.default = router;
