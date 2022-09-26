import mongoose from 'mongoose';

export interface Order {
    _id: string,
    name: string,
    email: string,
    whatYouWish: string,
    status: string,
    statusEn: string,
    previousWebsite: string,
    type: string,
    phone: string,
    websiteTitle: string,
    orderDate: Date,
    isSent: boolean,
    rockLink: string | "https://space.new/websiteswithpassion",
}

const orderSchema = new mongoose.Schema<Order>({
    name: String,
    email: String,
    whatYouWish: String,
    status: String,
    statusEn: String,
    previousWebsite: String,
    type: String,
    phone: String,
    isSent: Boolean,
    websiteTitle: String,
    orderDate: {
        type: Date,
        default: Date.now()
    },
    rockLink: {
        type: String,
        default: 'https://space.new/websiteswithpassion'
    }
});

export default mongoose.model<Order>("Order", orderSchema)