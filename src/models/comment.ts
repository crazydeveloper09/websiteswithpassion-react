import mongoose from 'mongoose';
import { Project } from './project';

export interface Comment {
    author: string,
    text: string,
    written: Date,
    project: Project,
    stars: number
}

const commentSchema = new mongoose.Schema<Comment>({
    author: String,
    text: {
        type: String,
        required: true
    },
    written: {
        type: Date,
        default: Date.now()
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },
    stars: Number
});

export default mongoose.model<Comment>("Comment", commentSchema);
