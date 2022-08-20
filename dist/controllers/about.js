"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.editUser = exports.getUserInfo = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUserInfo = (req, res, next) => {
    let admin_username = "Admin";
    user_1.default.findOne({ username: admin_username })
        .populate('achievements')
        .populate('services')
        .exec()
        .then((user) => res.json(user))
        .catch((err) => res.json(err));
};
exports.getUserInfo = getUserInfo;
const editUser = (req, res, next) => {
    user_1.default.findByIdAndUpdate(req.params.about_id, req.body.user)
        .exec()
        .then((updatedUser) => res.json(updatedUser))
        .catch((err) => res.json(err));
};
exports.editUser = editUser;
const deleteUser = (req, res, next) => {
    user_1.default.findByIdAndRemove(req.params.about_id)
        .exec()
        .then((deletedUser) => res.json(deletedUser))
        .catch((err) => res.json(err));
};
exports.deleteUser = deleteUser;
