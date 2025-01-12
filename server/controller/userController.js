import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import validator from "validator";
import jwt from 'jsonwebtoken'

const loginUser = async (req, res)=>{
    const {email, password} = req.body
    try {
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({
                success:false,
                message:"User doesn't exist"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({
                success:false,
                message:"Invalid Credentials"
            })
        }

        const token = createToken(user._id);
        res.json({
            success:true,
            status:true,
            token
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"Error"
        })
    }
}

const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}
const registerUser = async (req, res)=>{
    const {name, email, password} = req.body
    try {
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({
                success:false,
                message:"User Already Exists"
            })
        }
        if(!validator.isEmail(email)){
            return res.json({
                success:false,
                message:"Please Enter a Valid Email"
            })
        }
        if(password.length<8){
            return res.json({
                success:false,
                message:"Password should be at least 8 characters"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        const user = await newUser.save()
        const token = createToken(user._id)
        res.status(201).json({
            status:true,
            success:true, token
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"Error occured while creating user"
        })
    }
} 
export {loginUser, registerUser}