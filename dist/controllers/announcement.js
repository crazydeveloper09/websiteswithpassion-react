"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnnouncement = exports.editAnnouncement = exports.createAnnouncement = exports.fetchAllAnnouncements = void 0;
const announcement_1 = __importDefault(require("../models/announcement"));
const fetchAllAnnouncements = (req, res, next) => {
    announcement_1.default.find({})
        .exec()
        .then((announcements) => res.json(announcements))
        .catch((err) => res.json(err));
};
exports.fetchAllAnnouncements = fetchAllAnnouncements;
const createAnnouncement = (req, res, next) => {
    announcement_1.default.create({
        pl: req.body.pl,
        en: req.body.en,
    })
        .then((createdAnnouncement) => res.json(createdAnnouncement))
        .catch((err) => res.json(err));
};
exports.createAnnouncement = createAnnouncement;
const editAnnouncement = (req, res, next) => {
    announcement_1.default.findByIdAndUpdate(req.params.announcement_id, req.body.announcement)
        .exec()
        .then((updatedAnnouncement) => res.json(updatedAnnouncement))
        .catch((err) => res.json(err));
};
exports.editAnnouncement = editAnnouncement;
const deleteAnnouncement = (req, res, next) => {
    announcement_1.default.findByIdAndRemove(req.params.announcement_id)
        .exec()
        .then((deletedAnnouncement) => res.json(deletedAnnouncement))
        .catch((err) => res.json(err));
};
exports.deleteAnnouncement = deleteAnnouncement;
