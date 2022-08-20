"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.createComment = void 0;
const project_1 = __importDefault(require("../models/project"));
const comment_1 = __importDefault(require("../models/comment"));
const createComment = (req, res, next) => {
    console.log(req.params);
    project_1.default
        .findById(req.body.project._id)
        .exec()
        .then((project) => {
        console.log(project);
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
            console.log(createdComment);
            console.log(project === null || project === void 0 ? void 0 : project.reviews);
            res.json(createdComment);
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
