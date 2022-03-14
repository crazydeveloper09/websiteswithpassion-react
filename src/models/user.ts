import mongoose, { PassportLocalDocument, PassportLocalSchema } from 'mongoose';
import passportLocalMongoose from "passport-local-mongoose";
import { Achievement } from './achievement';
import { Service } from './service';
import { Technology } from './technology';

export interface User extends PassportLocalDocument {
    username: string,
    password: string,
    about: string,
    en: string,
    email: string,
    resetPasswordToken: string,
    resetPasswordExpires: Date,
    fbLink: string,
    fbDesc: string,
    igLink: string,
    igDesc: string,
    achievements: Achievement[],
    services: Service[],
    technologies: Technology[]
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    about: String,
    en: String,
    email:String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    fbLink: String,
    fbDesc: String,
    igLink: String,
    igDesc: String,
    achievements: [ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Achievement"
        } 
    ],
    services: [ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service"
        } 
    ],
    technologies: [ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Technology"
        } 
    ]
});
userSchema.plugin(passportLocalMongoose);
export default mongoose.model("User", userSchema);