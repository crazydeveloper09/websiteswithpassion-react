import { RequestHandler } from "express";
import CategoryModel, { Category } from "../models/category";
import Project from "../models/project";

type CategoryParams = {
  category_id?: string;
  project_id?: string;
};

export const fetchAllCategories: RequestHandler<CategoryParams> = (
  req,
  res,
  next
) => {
  CategoryModel
    .find({})
    .populate('projects')
    .exec()
    .then((categories) => res.json(categories))
    .catch((err) => res.json(err));
};

export const createCategory: RequestHandler<
  CategoryParams,
  unknown,
  Category
> = (req, res, next) => {
  console.log(req.body)
  let newCategory = new CategoryModel({
    title: req.body.title,
    titleEn: req.body.titleEn,
    color: req.body.color,
    link: req.body.titleEn.toLowerCase().split(" ").join("-"),
    icon: req.body.icon
  });
  CategoryModel.create(newCategory)
    .then((createdCategory) => res.json(createdCategory))
    .catch((err) => res.json(err));
};

export const addProjectToCategory: RequestHandler<CategoryParams> = (
  req,
  res,
  next
) => {
  Project.findById(req.body.projectId)
    .exec()
    .then((project) => {
      CategoryModel.findById(req.params.category_id)
        .exec()
        .then((category) => {
          category!.projects!.push(project!._id);
          category!.save();
          project!.categories.push(category!._id);
          project!.save();
          res.json(category);
        })
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
};

export const editCategory: RequestHandler<
  CategoryParams,
  unknown,
  { category: Category }
> = (req, res, next) => {
  console.log(req.body)
  CategoryModel.findByIdAndUpdate(req.params.category_id, req.body.category, {new: true})
    .exec()
    .then((updatedCategory) => {
      updatedCategory!.link = updatedCategory!.titleEn
        .toLowerCase()
        .split(" ")
        .join("-");
      updatedCategory!.save();
      res.json(updatedCategory);
    })
    .catch((err) => res.json(err));
};

export const deleteCategory: RequestHandler<CategoryParams> = (
  req,
  res,
  next
) => {
  CategoryModel.findByIdAndRemove(req.params.category_id)
    .exec()
    .then((deletedCategory) => res.json(deletedCategory))
    .catch((err) => res.json(err));
};
