import { RequestHandler } from "express";
import { CallbackError } from "mongoose";
import ServiceModel, { Service } from "../models/service";
import UserModel, { User } from "../models/user";

type ServiceParams = {
  user_id: string;
  service_id: string;
};

export const fetchAllServices: RequestHandler<ServiceParams> = (
  req,
  res,
  next
): void => {
  ServiceModel.find({ user: req.params.user_id })
    .then((services) => res.json(services))
    .catch((err) => res.json(err));
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
    user: req.params.user_id
  })
    .then((createdService) => {
      UserModel.findById(req.params.user_id)
        .exec()
        .then((user) => {
          (user as User)!.services.push(createdService);
          (user as User)!.save();
          res.json(createdService);
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
  ServiceModel.findByIdAndUpdate(req.params.service_id, req.body.service, {new: true})
    .exec()
    .then((updatedService) => res.json(updatedService))
    .catch((err) => res.json(err));
};

export const deleteService: RequestHandler<ServiceParams> = (
  req,
  res,
  next
): void => {
  ServiceModel.findByIdAndRemove(req.params.service_id)
    .exec()
    .then((deletedService) => res.json(deletedService))
    .catch((err) => res.json(err));
};
