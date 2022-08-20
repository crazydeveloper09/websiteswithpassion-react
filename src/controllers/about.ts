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
    .populate("achievements")
    .exec()
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
};

export const editUser: RequestHandler<AboutParams, unknown, { user: User }> = (
  req,
  res,
  next
): void => {
  UserModel.findByIdAndUpdate(req.params.about_id, req.body.user, {new: true})
    .exec()
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => res.json(err));
};

export const deleteUser: RequestHandler<AboutParams> = (
  req,
  res,
  next
): void => {
  UserModel.findByIdAndRemove(req.params.about_id)
    .exec()
    .then((deletedUser) => res.json(deletedUser))
    .catch((err) => res.json(err));
};
