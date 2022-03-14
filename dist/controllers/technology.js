"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTechnology = exports.editTechnology = exports.createTechnology = void 0;
const technology_1 = __importDefault(require("../models/technology"));
const user_1 = __importDefault(require("../models/user"));
const createTechnology = (req, res, next) => {
    technology_1.default.create({
        icon: req.body.icon,
        name: req.body.name,
    })
        .then((createdTechnology) => {
        user_1.default.findById(req.params.user_id)
            .exec()
            .then((user) => {
            user.technologies.push(createdTechnology);
            user.save();
            res.json(user);
        })
            .catch((err) => res.json(err));
    })
        .catch((err) => res.json(err));
};
exports.createTechnology = createTechnology;
const editTechnology = (req, res, next) => {
    technology_1.default.findByIdAndUpdate(req.params.technology_id, req.body.technology)
        .exec()
        .then((updatedTechnology) => {
        user_1.default.findById(req.params.user_id)
            .exec()
            .then((user) => res.json(user))
            .catch((err) => res.json(err));
    })
        .catch((err) => res.json(err));
};
exports.editTechnology = editTechnology;
const deleteTechnology = (req, res, next) => {
    technology_1.default.findByIdAndRemove(req.params.technology_id)
        .exec()
        .then((deletedTechnology) => {
        user_1.default.findById(req.params.user_id)
            .exec()
            .then((user) => res.json(user))
            .catch((err) => res.json(err));
    })
        .catch((err) => res.json(err));
};
exports.deleteTechnology = deleteTechnology;
