"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    name: String,
    email: String,
    whatYouWish: String,
    status: String,
    statusEn: String,
    previousWebsite: String,
    type: String,
    isSent: Boolean,
    websiteTitle: String,
    orderDate: {
        type: Date,
        default: Date.now()
    },
    rockLink: {
        type: String,
        default: 'https://space.new/websiteswithpassion'
    },
    budget: Number
});
exports.default = mongoose_1.default.model("Order", orderSchema);
