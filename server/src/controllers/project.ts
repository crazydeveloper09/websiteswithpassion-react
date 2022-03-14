import { RequestHandler } from "express";
import ProjectModel, { Project } from "../models/project";
import Category from "../models/category";
import cloudinary from "cloudinary";
import { CallbackError } from "mongoose";

cloudinary.config({
  cloud_name: "syberiancats",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type ProjectParams = {
  project_id: string;
};

export const fetchAllProjects: RequestHandler = (req, res, next): void => {
  ProjectModel.find({})
    .populate(["categories", "reviews"])
    .exec(function (err, projects) {
      if (err) {
        console.log(err);
      } else {
        Category.find({}, (err, categories) => {
          let data = {
            projects: projects,
            categories: categories,
          };
          res.json(data);
        });
      }
    });
};

export const createProject: RequestHandler<unknown, unknown, Project> = (
  req,
  res,
  next
): void => {
  cloudinary.v2.uploader.upload(req.file!.path, function (result) {
    let newProject = new ProjectModel({
      title: req.body.title,
      description: req.body.description,
      profile: result!.secure_url,
      status: req.body.status,
      link: req.body.link,
      subpageLink: req.body.title.toLowerCase().split(" ").join("-"),
      pictures: [],
      added: Date.now(),
      en: req.body.en,
      statusEn: req.body.statusEn,
    });
    ProjectModel.create(newProject)
      .then((createdProject) => res.json(createdProject))
      .catch((err) => res.json(err));
  });
};

export const editProjectMainPhoto: RequestHandler<ProjectParams> = (
  req,
  res,
  next
): void => {
  cloudinary.v2.uploader.upload(req.file!.path, function (result) {
    ProjectModel.findById(req.params.project_id)
      .exec()
      .then((project) => {
        project!.profile = result!.secure_url;
        project!.edited = Date.now();
        project!.save();
        res.json(project);
      })
      .catch((err) => res.json(err));
  });
};

export const addPictureToProjectGallery: RequestHandler<ProjectParams> = (
  req,
  res,
  next
): void => {
  cloudinary.v2.uploader.upload(req.file!.path, function (result) {
    ProjectModel.findById(req.params.project_id)
      .exec()
      .then((project) => {
        project!.pictures.push(result!.secure_url);
        project!.edited = Date.now();
        project!.save();
        res.json(project);
      })
      .catch((err) => res.json(err));
  });
};

export const editProject: RequestHandler<
  ProjectParams,
  unknown,
  { project: Project }
> = (req, res, next): void => {
  ProjectModel.findByIdAndUpdate(req.params.project_id, req.body.project)
    .exec()
    .then((updatedProject) => {
      updatedProject!.edited = Date.now();
      updatedProject!.subpageLink = updatedProject!.title
        .toLowerCase()
        .split(" ")
        .join("-");
      updatedProject!.save();
      res.json(updatedProject);
    })
    .catch((err) => res.json(err));
};

export const deleteProject: RequestHandler<ProjectParams> = (
  req,
  res,
  next
): void => {
  ProjectModel.findByIdAndRemove(req.params.project_id)
    .exec()
    .then((deletedProject) => res.json(deletedProject))
    .catch((err) => res.json(err));
};
