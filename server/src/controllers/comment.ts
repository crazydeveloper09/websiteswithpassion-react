import { RequestHandler } from "express";
import Project from "../models/project";
import CommentModel, { Comment } from "../models/comment";

type CommentParams = {
    project_id: string,
    comment_id?: string
}

export const createComment: RequestHandler<CommentParams, unknown, Comment> = (req, res, next) => {
    Project
        .findById(req.params.project_id)
        .exec()
        .then((project) => {
            CommentModel
                .create({
                    text: req.body.text,
                    author: req.body.author,
                    project: project!._id,
                    stars: req.body.stars
                })
                .then(createdComment => {
                  
                    project!.reviews.push(createdComment._id);
                    project!.save();
                })
                .catch(err => res.json(err))
        })
        .catch((err) => res.json(err))       
}

export const deleteComment: RequestHandler<CommentParams> = (req, res, next) => {
    CommentModel
        .findByIdAndDelete(req.params.comment_id)
        .exec()
        .then((deletedComment) => res.json(deletedComment))
        .catch((err) => res.json(err))
}