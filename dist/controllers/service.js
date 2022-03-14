"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteService = exports.editService = exports.createService = void 0;
const service_1 = __importDefault(require("../models/service"));
const user_1 = __importDefault(require("../models/user"));
const createService = (req, res, next) => {
    service_1.default.create({
        icon: req.body.icon,
        title: req.body.title,
        titleEn: req.body.titleEn,
        description: req.body.description,
        descriptionEn: req.body.descriptionEn,
    })
        .then((createdService) => {
        user_1.default.findById(req.params.user_id)
            .exec()
            .then((user) => {
            user.services.push(createdService);
            user.save();
            res.json(user);
        })
            .catch((err) => res.json(err));
    })
        .catch((err) => res.json(err));
};
exports.createService = createService;
const editService = (req, res, next) => {
    service_1.default.findByIdAndUpdate(req.params.service_id, req.body.service)
        .exec()
        .then((updatedService) => {
        user_1.default.findById(req.params.user_id)
            .exec()
            .then((user) => res.json(user))
            .catch((err) => res.json(err));
    })
        .catch((err) => res.json(err));
};
exports.editService = editService;
const deleteService = (req, res, next) => {
    service_1.default.findByIdAndRemove(req.params.service_id)
        .exec()
        .then((deletedService) => {
        user_1.default.findById(req.params.user_id)
            .exec()
            .then((user) => res.json(user))
            .catch((err) => res.json(err));
    })
        .catch((err) => res.json(err));
};
exports.deleteService = deleteService;
