import { RequestHandler } from "express";
import { CallbackError } from "mongoose";
import TechnologyModel, { Technology } from "../models/technology";
import UserModel, { User } from "../models/user";

type TechnologyParams = {
  user_id: string;
  technology_id: string;
};

export const fetchAllTechnologies: RequestHandler<TechnologyParams> = (
  req,
  res,
  next
): void => {
  TechnologyModel.find({ user: req.params.user_id })
    .then((technologies) => res.json(technologies))
    .catch((err) => res.json(err));
};

export const createTechnology: RequestHandler<
  TechnologyParams,
  unknown,
  Technology
> = (req, res, next): void => {
  TechnologyModel.create({
    icon: req.body.icon,
    name: req.body.name,
    user: req.params.user_id
  })
    .then((createdTechnology) => {
      UserModel.findById(req.params.user_id)
        .exec()
        .then((user) => {
          (user as User)!.technologies.push(createdTechnology);
          (user as User)!.save();
          res.json(createdTechnology);
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
    req.body.technology, {new: true}
  )
    .exec()
    .then((updatedTechnology) => res.json(updatedTechnology))
    .catch((err) => res.json(err));
};

export const deleteTechnology: RequestHandler<TechnologyParams> = (
  req,
  res,
  next
): void => {
  TechnologyModel.findByIdAndRemove(req.params.technology_id)
    .exec()
    .then((deletedTechnology) => res.json(deletedTechnology))
    .catch((err) => res.json(err));
};
