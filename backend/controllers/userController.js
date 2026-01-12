import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator"

//login user
const loginUser=async(req,res)=>{
   const{email,password}=req.body;
   try {
      const user=await userModel.findOne({email});
      if(!user){
        return res.json({success:false,message:"User not found"})
      }
      const ismatch= await bcrypt.compare(password,user.password);
      if(!ismatch){
         return res.json({success:false,message:"Invalid credentials"});
      }
      const token=createToken(user._id);
      res.json({success:true,token});
   } catch (error) {
      console.log(error);
      res.json({success:false,message:"Login failed"})
   }
}
//create token
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}
//register user
const registerUser=async(req,res)=>{
    const{name,email,password}=req.body;
   
    try{
        //checking is user already registered
         const exists=await userModel.findOne({email});
         if(exists){
            return res.json({success:false,message:"User already exists "})
         }   
         //validating email and password
         if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a vailid email"})    
         }
         if(!validator.isStrongPassword(password)){
            return res.json({success:false,message:"Please enter a strong password"})
         }
         //hashing user password using brypt
         const salt= await bcrypt.genSalt(10);
         const hashesdPassword= await bcrypt.hash(password,salt);

         //creating user
         const newUser= new userModel({
            name:name,
            email:email,
            password:hashesdPassword
         });

         const user= await newUser.save();
         const token=createToken(user._id);
         res.json({success:true,token});
    }
    catch (error) {
        console.log(error);
        res.json({success:false,message:"Registeration failed"})
    }
}
export {loginUser,registerUser}