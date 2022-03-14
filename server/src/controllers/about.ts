import { exec } from "child_process";
import { RequestHandler } from "express";
import { CallbackError } from "mongoose";
import UserModel, { User } from "../models/user";

type AboutParams = {
  about_id: string;
};

export const getUserInfo: RequestHandler = (req, res, next): void => {
  let admin_username = "Admin";
  UserModel.findOne({ username: admin_username })
    .populate('achievements')
    .populate('services')
    .exec()
    .then((user: User) => res.json(user))
    .catch((err: CallbackError) => res.json(err));
};

export const editUser: RequestHandler<AboutParams, unknown, { user: User }> = (
  req,
  res,
  next
): void => {
  UserModel.findByIdAndUpdate(req.params.about_id, req.body.user)
    .exec()
    .then((updatedUser: User) => res.json(updatedUser))
    .catch((err: CallbackError) => res.json(err));
};

export const deleteUser: RequestHandler<AboutParams> = (
  req,
  res,
  next
): void => {
  UserModel.findByIdAndRemove(req.params.about_id)
    .exec()
    .then((deletedUser: User) => res.json(deletedUser))
    .catch((err: CallbackError) => res.json(err));
};
