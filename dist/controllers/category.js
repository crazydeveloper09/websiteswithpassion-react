"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.editCategory = exports.addProjectToCategory = exports.createCategory = exports.fetchAllCategories = void 0;
const category_1 = __importDefault(require("../models/category"));
const project_1 = __importDefault(require("../models/project"));
const fetchAllCategories = (req, res, next) => {
    category_1.default
        .find({})
        .populate('projects')
        .exec()
        .then((categories) => res.json(categories))
        .catch((err) => res.json(err));
};
exports.fetchAllCategories = fetchAllCategories;
const createCategory = (req, res, next) => {
    console.log(req.body);
    let newCategory = new category_1.default({
        title: req.body.title,
        titleEn: req.body.titleEn,
        color: req.body.color,
        link: req.body.titleEn.toLowerCase().split(" ").join("-"),
        icon: req.body.icon
    });
    category_1.default.create(newCategory)
        .then((createdCategory) => res.json(createdCategory))
        .catch((err) => res.json(err));
};
exports.createCategory = createCategory;
const addProjectToCategory = (req, res, next) => {
    project_1.default.findById(req.body.projectId)
        .exec()
        .then((project) => {
        category_1.default.findById(req.params.category_id)
            .exec()
            .then((category) => {
            category.projects.push(project._id);
            category.save();
            project.categories.push(category._id);
            project.save();
            res.json(category);
        })
            .catch((err) => res.json(err));
    })
        .catch((err) => res.json(err));
};
exports.addProjectToCategory = addProjectToCategory;
const editCategory = (req, res, next) => {
    console.log(req.body);
    category_1.default.findByIdAndUpdate(req.params.category_id, req.body.category, { new: true })
        .exec()
        .then((updatedCategory) => {
        updatedCategory.link = updatedCategory.titleEn
            .toLowerCase()
            .split(" ")
            .join("-");
        updatedCategory.save();
        res.json(updatedCategory);
    })
        .catch((err) => res.json(err));
};
exports.editCategory = editCategory;
const deleteCategory = (req, res, next) => {
    category_1.default.findByIdAndRemove(req.params.category_id)
        .exec()
        .then((deletedCategory) => res.json(deletedCategory))
        .catch((err) => res.json(err));
};
exports.deleteCategory = deleteCategory;
