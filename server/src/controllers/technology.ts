import { RequestHandler } from "express";
import { CallbackError } from "mongoose";
import TechnologyModel, { Technology } from "../models/technology";
import UserModel, { User } from "../models/user";

type TechnologyParams = {
  user_id: string;
  technology_id: string;
};

export const createTechnology: RequestHandler<
  TechnologyParams,
  unknown,
  Technology
> = (req, res, next): void => {
  TechnologyModel.create({
    icon: req.body.icon,
    name: req.body.name,
  })
    .then((createdTechnology) => {
      UserModel.findById(req.params.user_id)
        .exec()
        .then((user: User) => {
          user.technologies.push(createdTechnology);
          user.save();
          res.json(user);
        })
        .catch((err: CallbackError) => res.json(err));
    })
    .catch((err) => res.json(err));
};

export const editTechnology: RequestHandler<
  TechnologyParams,
  unknown,
  {technology: Technology}
> = (req, res, next): void => {
  TechnologyModel.findByIdAndUpdate(
    req.params.technology_id,
    req.body.technology
  )
    .exec()
    .then((updatedTechnology) => {
      UserModel.findById(req.params.user_id)
        .exec()
        .then((user: User) => res.json(user))
        .catch((err: CallbackError) => res.json(err));
    })
    .catch((err) => res.json(err));
};

export const deleteTechnology: RequestHandler<TechnologyParams> = (
  req,
  res,
  next
): void => {
  TechnologyModel.findByIdAndRemove(req.params.technology_id)
    .exec()
    .then((deletedTechnology) => {
      UserModel.findById(req.params.user_id)
        .exec()
        .then((user: User) => res.json(user))
        .catch((err: CallbackError) => res.json(err));
    })
    .catch((err) => res.json(err));
};
