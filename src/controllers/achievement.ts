import { RequestHandler } from "express";
import AchievementModel, { Achievement } from "../models/achievement";
import UserModel, { User } from "../models/user";
import cloudinary from "cloudinary";
import { CallbackError } from "mongoose";

cloudinary.v2.config({
  cloud_name: "syberiancats",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type AchievementParams = {
  user_id: string;
  achievement_id: string;
};

export const fetchAllUserAchievements: RequestHandler<AchievementParams> = (
  req,
  res,
  next
): void => {
  AchievementModel.find({ user: req.params.user_id })
    .exec()
    .then((achievements) => res.json(achievements))
    .catch((err) => res.json(err));
};

export const createAchievement: RequestHandler<
  AchievementParams,
  unknown,
  Achievement
> = (req, res, next): void => {
  cloudinary.v2.uploader.upload(req.file!.path, function (err, result) {
    
    UserModel.findById(req.params.user_id)
      .exec()
      .then((user) => {
        AchievementModel.create({
          title: req.body.title,
          titleEn: req.body.titleEn,
          picture: result!.secure_url,
          user: req.params.user_id,
        })
          .then((achievement) => {
            user!.achievements.push(achievement._id);
            user!.save();
            res.json(achievement);
          })
          .catch((err) => res.json(err));
      })
      .catch((err: CallbackError) => res.json(err));
  });
};

export const editAchievementMainPicture: RequestHandler<AchievementParams> = (
  req,
  res,
  next
): void => {
  cloudinary.v2.uploader.upload(req.file!.path, function (err, result) {
    AchievementModel.findById(req.params.achievement_id)
      .exec()
      .then((achievement) => {
        achievement!.picture = result!.secure_url;
        achievement!.save();
        res.json(achievement);
      })
      .catch((err) => res.json(err));
  });
};

export const editAchievement: RequestHandler<
  AchievementParams,
  unknown,
  { achievement: Achievement }
> = (req, res, next): void => {
  AchievementModel.findByIdAndUpdate(
    req.params.achievement_id,
    req.body.achievement, {new: true}
  )
    .exec()
    .then((updatedAchievement) => res.json(updatedAchievement))
    .catch((err) => res.json(err));
};

export const deleteAchievement: RequestHandler<AchievementParams> = (
  req,
  res,
  next
): void => {
  AchievementModel.findByIdAndDelete(req.params.achievement_id)
    .exec()
    .then((deletedAchievement) => res.json(deletedAchievement))
    .catch((err) => res.json(err));
};
