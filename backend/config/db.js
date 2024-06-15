import mongoose from "mongoose";

export const connectDB = async()=> {
    await mongoose.connect('mongodb+srv://yumyum:12345@cluster0.lq0d7oj.mongodb.net/YumYum_Express').then(()=>console.log("DB Connected"));
}