import { asynkHandler } from "../utils/async.js"
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { Apiresponse } from "../utils/Apiresponse.js";
import { json } from "express";

const registerUser = asynkHandler(async(req,res)=>{
    // get uesr details from frontend
    // validation - not empty
    // check if user already exist
    // check for images , check for avtar 
    // upload them to cloudnary, check avatar 
    // create user object- create entry in db
    // remove password  and refresh token field from response
    // check for usser creation 
    // return res

    // step 01;

    const {fullName,email,username,password}= req.body
    console.log("email:",email);

    if(
        [fullName,email,username,password].some((field)=>
        field.trim() === "")
    ){
        throw new ApiError(400, "All field are required")
    }

    const existedUser = User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User with email or username already exist")
    }
        
    const avatarLocalPath = req.files.avatar[0].path
    const coverImageLocalPath = req.files.coverImage[0].path;
    
    if(!avatarLocalPath){
         throw new ApiError(400,"Avatar file is required")
    }
    
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    
    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }
    
    User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage.url || "",
        email,
        password,
        username: username.toLowerCase()

    })

    const createdUser = await User.findById(user._id).select(
        "-password - refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something Went Wrong while registering the user")
    }

    return res.status(201).json(
        new Apiresponse(200,createdUser,"User registered Succesfully")
    )

})

export {registerUser};