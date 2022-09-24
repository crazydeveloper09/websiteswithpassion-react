"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.editProject = exports.addPictureToProjectGallery = exports.editProjectMainPhoto = exports.createProject = exports.fetchSingleProject = exports.fetchAllProjects = void 0;
const project_1 = __importDefault(require("../models/project"));
const category_1 = __importDefault(require("../models/category"));
const cloudinary_1 = __importDefault(require("cloudinary"));
require('dotenv').config();
cloudinary_1.default.v2.config({
    cloud_name: "syberiancats",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const fetchAllProjects = (req, res, next) => {
    project_1.default.find({})
        .populate(["categories", "reviews"])
        .exec(function (err, projects) {
        if (err) {
            console.log(err);
        }
        else {
            category_1.default.find({}, (err, categories) => {
                let data = {
                    projects: projects,
                    categories: categories,
                };
                res.json(data);
            });
        }
    });
};
exports.fetchAllProjects = fetchAllProjects;
const fetchSingleProject = (req, res, next) => {
    project_1.default.findOne({ subpageLink: req.params.project_link })
        .populate(["categories", "reviews"])
        .exec(function (err, project) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(project);
        }
    });
};
exports.fetchSingleProject = fetchSingleProject;
const createProject = (req, res, next) => {
    cloudinary_1.default.v2.uploader.upload(req.file.path, function (err, result) {
        let newProject = new project_1.default({
            title: req.body.title,
            description: req.body.description,
            profile: result.secure_url,
            status: req.body.status,
            link: req.body.link,
            subpageLink: req.body.title.toLowerCase().split(" ").join("-"),
            pictures: [],
            added: Date.now(),
            en: req.body.en,
            statusEn: req.body.statusEn,
        });
        project_1.default.create(newProject)
            .then((createdProject) => {
            const categories = req.body.categories.split(',');
            createdProject.categories = [...categories];
            createdProject.save();
            res.json(createdProject);
        })
            .catch((err) => res.json(err));
    });
};
exports.createProject = createProject;
const editProjectMainPhoto = (req, res, next) => {
    cloudinary_1.default.v2.uploader.upload(req.file.path, function (err, result) {
        project_1.default.findById(req.params.project_id)
            .exec()
            .then((project) => {
            project.profile = result.secure_url;
            project.edited = Date.now();
            project.save();
            res.json(project);
        })
            .catch((err) => res.json(err));
    });
};
exports.editProjectMainPhoto = editProjectMainPhoto;
const addPictureToProjectGallery = (req, res, next) => {
    cloudinary_1.default.v2.uploader.upload(req.file.path, function (err, result) {
        project_1.default.findById(req.params.project_id)
            .exec()
            .then((project) => {
            project.pictures.push(result.secure_url);
            project.edited = Date.now();
            project.save();
            res.json(project);
        })
            .catch((err) => res.json(err));
    });
};
exports.addPictureToProjectGallery = addPictureToProjectGallery;
const editProject = (req, res, next) => {
    project_1.default.findByIdAndUpdate(req.params.project_id, req.body.project, { new: true })
        .populate("reviews")
        .exec()
        .then((updatedProject) => {
        updatedProject.edited = Date.now();
        updatedProject.subpageLink = updatedProject.title
            .toLowerCase()
            .split(" ")
            .join("-");
        updatedProject.save();
        res.json(updatedProject);
    })
        .catch((err) => res.json(err));
};
exports.editProject = editProject;
const deleteProject = (req, res, next) => {
    project_1.default.findByIdAndRemove(req.params.project_id)
        .exec()
        .then((deletedProject) => res.json(deletedProject))
        .catch((err) => res.json(err));
};
exports.deleteProject = deleteProject;
