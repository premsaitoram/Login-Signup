import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://s160121:84j2ZFWpkXpKbjED@cluster0.6su57wn.mongodb.net/login-page').then(()=>console.log("DB is Connected"));
}