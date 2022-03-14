import { NextFunction, RequestHandler } from "express";
import multer from "multer";

export const isLoggedIn: RequestHandler = (req, res, next): NextFunction | void => {
    if(req.isAuthenticated()){
        return next();
    }
    res.json({type: "error", message: "Log in to do it"})
}

const storage = multer.diskStorage({
    filename: function(req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});
const imageFilter = function (req: any, file: any, cb: any) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
export const upload = multer({ storage: storage, fileFilter: imageFilter})