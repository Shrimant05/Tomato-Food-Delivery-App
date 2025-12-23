import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://shrimant:Shrimant2005@cluster0.dtarrtf.mongodb.net/food-del').then(()=>{
        console.log('DB Connected')
    })
}