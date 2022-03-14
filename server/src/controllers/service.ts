import { RequestHandler } from "express";
import { CallbackError } from "mongoose";
import ServiceModel, { Service } from "../models/service";
import UserModel, { User } from "../models/user";

type ServiceParams = {
  user_id: string;
  service_id: string;
};

export const createService: RequestHandler<ServiceParams, unknown, Service> = (
  req,
  res,
  next
): void => {
  ServiceModel.create({
    icon: req.body.icon,
    title: req.body.title,
    titleEn: req.body.titleEn,
    description: req.body.description,
    descriptionEn: req.body.descriptionEn,
  })
    .then((createdService) => {
      UserModel.findById(req.params.user_id)
        .exec()
        .then((user: User) => {
          user.services.push(createdService);
          user.save();
          res.json(user);
        })
        .catch((err: CallbackError) => res.json(err));
    })
    .catch((err) => res.json(err));
};

export const editService: RequestHandler<
  ServiceParams,
  unknown,
  { service: Service }
> = (req, res, next): void => {
  ServiceModel.findByIdAndUpdate(req.params.service_id, req.body.service)
    .exec()
    .then((updatedService) => {
      UserModel.findById(req.params.user_id)
        .exec()
        .then((user: User) => res.json(user))
        .catch((err: CallbackError) => res.json(err));
    })
    .catch((err) => res.json(err));
};

export const deleteService: RequestHandler<ServiceParams> = (
  req,
  res,
  next
): void => {
  ServiceModel.findByIdAndRemove(req.params.service_id)
    .exec()
    .then((deletedService) => {
      UserModel.findById(req.params.user_id)
        .exec()
        .then((user: User) => res.json(user))
        .catch((err: CallbackError) => res.json(err));
    })
    .catch((err) => res.json(err));
};
