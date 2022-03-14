"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAchievement = exports.editAchievement = exports.editAchievementMainPicture = exports.createAchievement = void 0;
const achievement_1 = __importDefault(require("../models/achievement"));
const user_1 = __importDefault(require("../models/user"));
const cloudinary_1 = __importDefault(require("cloudinary"));
cloudinary_1.default.v2.config({
    cloud_name: "syberiancats",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const createAchievement = (req, res, next) => {
    cloudinary_1.default.v2.uploader.upload(req.file.path, function (result) {
        user_1.default.findById(req.params.user_id)
            .exec()
            .then((user) => {
            achievement_1.default.create({
                title: req.body.title,
                titleEn: req.body.titleEn,
                picture: result.secure_url,
            })
                .then((achievement) => {
                user.achievements.push(achievement._id);
                user.save();
                res.json(user);
            })
                .catch((err) => res.json(err));
        })
            .catch((err) => res.json(err));
    });
};
exports.createAchievement = createAchievement;
const editAchievementMainPicture = (req, res, next) => {
    cloudinary_1.default.v2.uploader.upload(req.file.path, function (result) {
        user_1.default.findById(req.params.user_id)
            .exec()
            .then((user) => {
            achievement_1.default.findById(req.params.achievement_id)
                .exec()
                .then((achievement) => {
                achievement.picture = result.secure_url;
                achievement.save();
                res.json(user);
            })
                .catch((err) => res.json(err));
        })
            .catch((err) => res.json(err));
    });
};
exports.editAchievementMainPicture = editAchievementMainPicture;
const editAchievement = (req, res, next) => {
    user_1.default.findById(req.params.user_id)
        .exec()
        .then((user) => {
        achievement_1.default.findByIdAndUpdate(req.params.achievement_id, req.body.achievement)
            .exec()
            .then((updatedAchievement) => res.json(user))
            .catch((err) => res.json(err));
    })
        .catch((err) => res.json(err));
};
exports.editAchievement = editAchievement;
const deleteAchievement = (req, res, next) => {
    user_1.default.findById(req.params.user_id)
        .exec()
        .then((user) => {
        achievement_1.default.findByIdAndDelete(req.params.achievement_id)
            .exec()
            .then((deletedAchievement) => res.json(user))
            .catch((err) => res.json(err));
    })
        .catch((err) => res.json(err));
};
exports.deleteAchievement = deleteAchievement;
