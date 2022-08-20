import { RequestHandler } from "express";
import AnnouncementModel, { Announcement } from "../models/announcement";

type AnnouncementParams = {
  announcement_id: string;
};

export const fetchAllAnnouncements: RequestHandler = (req, res, next): void => {
  AnnouncementModel.find({})
    .exec()
    .then((announcements) => res.json(announcements))
    .catch((err) => res.json(err));
};

export const createAnnouncement: RequestHandler<unknown, unknown, Announcement> = (req, res, next): void => {
  AnnouncementModel.create({
    pl: req.body.pl,
    en: req.body.en,
  })
    .then((createdAnnouncement) => res.json(createdAnnouncement))
    .catch((err) => res.json(err));
};

export const editAnnouncement: RequestHandler<AnnouncementParams, unknown, { announcement: Announcement }> = (
  req,
  res,
  next
): void => {
  AnnouncementModel.findByIdAndUpdate(
    req.params.announcement_id,
    req.body.announcement, {new: true}
  )
    .exec()
    .then((updatedAnnouncement) => {
      res.json(updatedAnnouncement)
    })
    .catch((err) => res.json(err));
};

export const deleteAnnouncement: RequestHandler<AnnouncementParams> = (
  req,
  res,
  next
): void => {
  AnnouncementModel.findByIdAndRemove(req.params.announcement_id)
    .exec()
    .then((deletedAnnouncement) => res.json(deletedAnnouncement))
    .catch((err) => res.json(err));
};
