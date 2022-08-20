import mongoose from 'mongoose';

export interface Service {
    _id: string,
    icon: string,
    title: string,
    titleEn: string,
    description: string,
    descriptionEn: string
}

const serviceSchema = new mongoose.Schema<Service>({
    icon: String,
    title: String,
    titleEn: String,
    description: String,
    descriptionEn: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

export default mongoose.model<Service>("Service", serviceSchema)