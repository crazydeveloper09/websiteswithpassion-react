"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.createComment = void 0;
const project_1 = __importDefault(require("../models/project"));
const comment_1 = __importDefault(require("../models/comment"));
const createComment = (req, res, next) => {
    project_1.default
        .findById(req.params.project_id)
        .exec()
        .then((project) => {
        comment_1.default
            .create({
            text: req.body.text,
            author: req.body.author,
            project: project._id,
            stars: req.body.stars
        })
            .then(createdComment => {
            project.reviews.push(createdComment._id);
            project.save();
        })
            .catch(err => res.json(err));
    })
        .catch((err) => res.json(err));
};
exports.createComment = createComment;
const deleteComment = (req, res, next) => {
    comment_1.default
        .findByIdAndDelete(req.params.comment_id)
        .exec()
        .then((deletedComment) => res.json(deletedComment))
        .catch((err) => res.json(err));
};
exports.deleteComment = deleteComment;
