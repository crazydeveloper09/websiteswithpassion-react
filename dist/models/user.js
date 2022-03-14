"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    about: String,
    en: String,
    email: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    fbLink: String,
    fbDesc: String,
    igLink: String,
    igDesc: String,
    achievements: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Achievement"
        }
    ],
    services: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Service"
        }
    ],
    technologies: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Technology"
        }
    ]
});
userSchema.plugin(passport_local_mongoose_1.default);
exports.default = mongoose_1.default.model("User", userSchema);
