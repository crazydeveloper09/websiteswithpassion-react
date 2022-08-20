"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteService = exports.editService = exports.createService = exports.fetchAllServices = void 0;
const service_1 = __importDefault(require("../models/service"));
const user_1 = __importDefault(require("../models/user"));
const fetchAllServices = (req, res, next) => {
    service_1.default.find({ user: req.params.user_id })
        .then((services) => res.json(services))
        .catch((err) => res.json(err));
};
exports.fetchAllServices = fetchAllServices;
const createService = (req, res, next) => {
    service_1.default.create({
        icon: req.body.icon,
        title: req.body.title,
        titleEn: req.body.titleEn,
        description: req.body.description,
        descriptionEn: req.body.descriptionEn,
        user: req.params.user_id
    })
        .then((createdService) => {
        user_1.default.findById(req.params.user_id)
            .exec()
            .then((user) => {
            user.services.push(createdService);
            user.save();
            res.json(createdService);
        })
            .catch((err) => res.json(err));
    })
        .catch((err) => res.json(err));
};
exports.createService = createService;
const editService = (req, res, next) => {
    service_1.default.findByIdAndUpdate(req.params.service_id, req.body.service, { new: true })
        .exec()
        .then((updatedService) => res.json(updatedService))
        .catch((err) => res.json(err));
};
exports.editService = editService;
const deleteService = (req, res, next) => {
    service_1.default.findByIdAndRemove(req.params.service_id)
        .exec()
        .then((deletedService) => res.json(deletedService))
        .catch((err) => res.json(err));
};
exports.deleteService = deleteService;
