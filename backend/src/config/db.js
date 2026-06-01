import mongoose from "mongoose"

export const connectDb = async () =>{
    try{
       const connectionDb = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`mongodb host = ${connectionDb.connection.host}`)

    }
    catch (error){
        console.error('mongodb failed')
        throw error
    }
}