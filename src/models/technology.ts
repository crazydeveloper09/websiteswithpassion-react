import mongoose from 'mongoose';

export interface Technology {
    _id: string,
    icon: string,
    name: string
}

const technologySchema = new mongoose.Schema<Technology>({
    icon: String,
    name: String
})

export default mongoose.model<Technology>("Technology");