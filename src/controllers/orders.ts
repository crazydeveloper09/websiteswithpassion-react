import { RequestHandler } from "express";
import OrderModel, { Order } from "../models/orders";
import mailgun from "mailgun-js";

require("dotenv").config();

type OrderParams = {
  order_id: string;
};

async function sendEmail(
  from: string,
  to: string,
  topic: string,
  text: string
) {
  const DOMAIN = "websiteswithpassion.pl";
  const mg = mailgun({
    apiKey: process.env!.API_KEY!,
    domain: DOMAIN,
    host: "api.eu.mailgun.net",
  });
  const data = {
    from: from,
    to: to,
    subject: topic,
    text: text,
  };
  mg.messages().send(data, function (error, body) {});
}

export const fetchAllOrders: RequestHandler = (req, res, next) => {
  OrderModel.find({})
    .exec()
    .then((orders) => res.json(orders))
    .catch((err) => res.json(err));
};

export const checkStatusOrder: RequestHandler = (req, res, next) => {
  OrderModel.findOne({ email: req.query.email as string })
    .exec()
    .then((order) => res.json(order))
    .catch((err) => res.json(err));
};

export const createOrder: RequestHandler<unknown, unknown, Order> = (
  req,
  res,
  next
) => {
  let newOrder = new OrderModel({
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
  OrderModel.create(newOrder)
    .then((createdOrder) => {
      sendEmail(
        "Powiadomienie o nowej ofercie <oferty@websiteswithpassion.pl>",
        "maciejkuta6@gmail.com",
        "Ktoś wysłał nową ofertę",
        `Hej, \n właśnie dostaliśmy nową ofertę od ${createdOrder.name}. Sprawdź jej szczegóły na portfolio.`
      );
    })
    .catch((err) => res.json(err));
};

export const sendOfferOrder: RequestHandler<OrderParams> = (req, res, next) => {
  OrderModel.findById(req.params.order_id)
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
      sendEmail(
        "Websites With Passion - oferty <oferty@websiteswithpassion.pl>",
        order.email,
        req.body.topic,
        req.body.text
      );
    })
    .catch((err) => res.json(err));
};

export const editOrder: RequestHandler<
  OrderParams,
  unknown,
  { order: Order }
> = (req, res, next) => {
  OrderModel.findByIdAndUpdate(req.params.order_id, req.body.order)
    .exec()
    .then((updatedOrder) => res.json(updatedOrder))
    .catch((err) => res.json(err));
};

export const deleteOrder: RequestHandler<OrderParams> = (req, res, next) => {
  OrderModel.findByIdAndRemove(req.params.order_id)
    .exec()
    .then((deletedOrder) => res.json(deletedOrder))
    .catch((err) => res.json(err));
};
