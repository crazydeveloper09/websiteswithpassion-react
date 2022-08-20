"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAchievement = exports.editAchievement = exports.editAchievementMainPicture = exports.createAchievement = exports.fetchAllUserAchievements = void 0;
const achievement_1 = __importDefault(require("../models/achievement"));
const user_1 = __importDefault(require("../models/user"));
const cloudinary_1 = __importDefault(require("cloudinary"));
cloudinary_1.default.v2.config({
    cloud_name: "syberiancats",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const fetchAllUserAchievements = (req, res, next) => {
    achievement_1.default.find({ user: req.params.user_id })
        .exec()
        .then((achievements) => res.json(achievements))
        .catch((err) => res.json(err));
};
exports.fetchAllUserAchievements = fetchAllUserAchievements;
const createAchievement = (req, res, next) => {
    cloudinary_1.default.v2.uploader.upload(req.file.path, function (err, result) {
        user_1.default.findById(req.params.user_id)
            .exec()
            .then((user) => {
            achievement_1.default.create({
                title: req.body.title,
                titleEn: req.body.titleEn,
                picture: result.secure_url,
                user: req.params.user_id,
            })
                .then((achievement) => {
                user.achievements.push(achievement._id);
                user.save();
                res.json(achievement);
            })
                .catch((err) => res.json(err));
        })
            .catch((err) => res.json(err));
    });
};
exports.createAchievement = createAchievement;
const editAchievementMainPicture = (req, res, next) => {
    cloudinary_1.default.v2.uploader.upload(req.file.path, function (err, result) {
        achievement_1.default.findById(req.params.achievement_id)
            .exec()
            .then((achievement) => {
            achievement.picture = result.secure_url;
            achievement.save();
            res.json(achievement);
        })
            .catch((err) => res.json(err));
    });
};
exports.editAchievementMainPicture = editAchievementMainPicture;
const editAchievement = (req, res, next) => {
    achievement_1.default.findByIdAndUpdate(req.params.achievement_id, req.body.achievement, { new: true })
        .exec()
        .then((updatedAchievement) => res.json(updatedAchievement))
        .catch((err) => res.json(err));
};
exports.editAchievement = editAchievement;
const deleteAchievement = (req, res, next) => {
    achievement_1.default.findByIdAndDelete(req.params.achievement_id)
        .exec()
        .then((deletedAchievement) => res.json(deletedAchievement))
        .catch((err) => res.json(err));
};
exports.deleteAchievement = deleteAchievement;
