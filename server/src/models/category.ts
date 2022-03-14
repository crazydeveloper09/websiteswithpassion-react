import mongoose from 'mongoose';
import { Project } from './project';

export interface Category {
    title: string,
    titleEn: string,
    color: string,
    link: string,
    projects?: mongoose.Schema.Types.ObjectId[] | Project[]
}

const categorySchema = new mongoose.Schema<Category>({
    title: String,
    titleEn: String,
    color: String,
    link: String,
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }
    ]
})

export default mongoose.model<Category>("Category", categorySchema);
