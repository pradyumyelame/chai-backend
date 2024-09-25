import connectDB from "./db/index.js";
import dotenv from "dotenv"

dotenv.config({
    path: "./env"
})
connectDB()

















/*
import express from "express"
const app =express();

(async()=>{
    try{
         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
         app.on("error",(error)=>{
            console.log("ERROOR: ", error);
            throw error
         })

         app.listen(process.env.PORT,()=>{
            consolelog(`App is Listening on PORT ${process.env.PORT}`)
         })
    
        }catch(error){
        console.error("ERROR: ",error)
        throw err
    }
})()*/