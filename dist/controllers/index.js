"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = void 0;
const passport_1 = __importDefault(require("passport"));
const loginUser = (req, res, next) => {
    passport_1.default.authenticate('local', function (err, user, info) {
        if (err) {
            return res.json(err);
        }
        if (!user) {
            return res.json({ type: "error", message: "Zła nazwa użytkownika lub hasło" });
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.json(user);
        });
    })(req, res, next);
};
exports.loginUser = loginUser;
const logoutUser = (req, res, next) => {
    req.logout();
    res.json("Succesfully logout the user");
};
exports.logoutUser = logoutUser;
