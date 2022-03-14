import mongoose from 'mongoose';

export interface Achievement {
    title: string,
    titleEn: string,
    picture: string
}

const achievementsSchema = new mongoose.Schema<Achievement>({
    title:String,
    titleEn: String,
    picture: String
});

export default mongoose.model<Achievement>("Achievement", achievementsSchema);