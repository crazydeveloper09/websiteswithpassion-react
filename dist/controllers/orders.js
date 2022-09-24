"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.editOrder = exports.sendOfferOrder = exports.createOrder = exports.checkStatusOrder = exports.fetchAllOrders = void 0;
const orders_1 = __importDefault(require("../models/orders"));
const mailgun_js_1 = __importDefault(require("mailgun-js"));
require("dotenv").config();
async function sendEmail(from, to, topic, text) {
    const DOMAIN = "websiteswithpassion.pl";
    const mg = (0, mailgun_js_1.default)({
        apiKey: process.env.API_KEY,
        domain: DOMAIN,
        host: "api.eu.mailgun.net",
    });
    const data = {
        from: from,
        to: to,
        subject: topic,
        text: text,
    };
    mg.messages().send(data, function (error, body) { });
}
const fetchAllOrders = (req, res, next) => {
    orders_1.default.find({})
        .exec()
        .then((orders) => res.json(orders))
        .catch((err) => res.json(err));
};
exports.fetchAllOrders = fetchAllOrders;
const checkStatusOrder = (req, res, next) => {
    orders_1.default.find({ email: req.query.email })
        .exec()
        .then((orders) => res.json(orders))
        .catch((err) => res.json(err));
};
exports.checkStatusOrder = checkStatusOrder;
const createOrder = (req, res, next) => {
    let newOrder = new orders_1.default({
        name: req.body.name,
        email: req.body.email,
        whatYouWish: req.body.whatYouWish,
        previousWebsite: req.body.previousWebsite,
        status: "Zamówienie wysłane do mnie",
        statusEn: "Order has been sent to me",
        type: req.body.type,
        websiteTitle: req.body.websiteTitle,
        budget: req.body.budget,
    });
    orders_1.default.create(newOrder)
        .then((createdOrder) => {
        sendEmail("Powiadomienie o nowej ofercie <oferty@websiteswithpassion.pl>", "maciejkuta6@gmail.com", "Ktoś wysłał nową ofertę", `Hej, \n właśnie dostaliśmy nową ofertę od ${createdOrder.name}. Sprawdź jej szczegóły na portfolio.`);
    })
        .catch((err) => res.json(err));
};
exports.createOrder = createOrder;
const sendOfferOrder = (req, res, next) => {
    orders_1.default.findById(req.params.order_id)
        .exec()
        .then((order) => {
        if (!order) {
            res.json({
                type: "error",
                message: "Nie znaleźliśmy takiego zamówienia",
            });
            return;
        }
        order.isSent = true;
        order.status = "Oferta została wysłana";
        order.status = "Offer just sent";
        order.save();
        sendEmail("Websites With Passion - oferty <oferty@websiteswithpassion.pl>", order.email, req.body.topic, req.body.text);
    })
        .catch((err) => res.json(err));
};
exports.sendOfferOrder = sendOfferOrder;
const editOrder = (req, res, next) => {
    orders_1.default.findByIdAndUpdate(req.params.order_id, req.body.order, { new: true })
        .exec()
        .then((updatedOrder) => res.json(updatedOrder))
        .catch((err) => res.json(err));
};
exports.editOrder = editOrder;
const deleteOrder = (req, res, next) => {
    orders_1.default.findByIdAndRemove(req.params.order_id)
        .exec()
        .then((deletedOrder) => res.json(deletedOrder))
        .catch((err) => res.json(err));
};
exports.deleteOrder = deleteOrder;
