import mongoose from "mongoose";
import colors from 'colors'

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongodb connected ${mongoose.connection.port}`.bgGreen);
        
    } catch (error) {
        console.log(`Mongoose server issues ${error}`.bgRed);
        
    }
}

export default connectDB