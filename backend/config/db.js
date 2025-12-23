import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('DB-CONNECTION-STRING').then(()=>{
        console.log('DB Connected')
    })
}
