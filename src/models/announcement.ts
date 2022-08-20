import mongoose from 'mongoose';

export interface Announcement {
    pl: string,
    en: string
}

const announcementSchema = new mongoose.Schema<Announcement>({
    pl: String,
    en: String
})

export default mongoose.model<Announcement>("Announcement", announcementSchema);