import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import userRouter from './routes/userRoute.js'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

const app =  express()
const port = 8000
app.use(express.json())
app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true
}
    
))
app.use(cookieParser())
connectDB()

app.use("/api/user", userRouter)

app.get("/", (req,res)=>{
    res.send("api is working")
})

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})
