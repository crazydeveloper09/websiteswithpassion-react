import mongoose from 'mongoose';
import { Category } from './category';
import { Comment } from './comment';

export interface Project {
    _id: string,
    title: string,
    description: string,
    profile: string,
    status: string,
    link: string,
    subpageLink: string,
    pictures: string[],
    reviews: Comment[],
    categories: Category[],
    added: Date,
    edited?: Date | number,
	en: string,
	statusEn: string
}

const projectSchema = new mongoose.Schema<Project>({
    title: String,
    description: String,
    profile: String,
    status:String,
    link: String,
    subpageLink: String,
    pictures: Array,
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        }
    ],
    added: Date,
    edited: Date,
	en: String,
	statusEn: String
});

export default mongoose.model<Project>("Project", projectSchema);