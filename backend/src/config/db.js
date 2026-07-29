import mongoose from "mongoose"
import { env } from "./env.js"

export const connectDb = async () =>{
    try{
       const connectionDb = await mongoose.connect(env.MONGODB_URI)
        console.log(`mongodb host = ${connectionDb.connection.host}`)
        console.log("Connected to:", mongoose.connection.name)

    }
    catch (error){
        console.error('mongodb failed')
        throw error
    }
}