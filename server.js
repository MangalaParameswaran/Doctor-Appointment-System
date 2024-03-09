import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import connectDB from './config/db.js'
// import imageRoutes from './routes/imageRoutes.js'
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import path from 'path'
import { fileURLToPath } from 'url'; // Add this import


dotenv.config()

const __filename = fileURLToPath(import.meta.url); // Add this line
const __dirname = path.dirname(__filename); // Add this line


const app=express()
//PORT
const PORT=process.env.PORT || 8080

//MongoDB Connection
connectDB();

//middlewar
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

//IMAGE ROUTE
// app.use('/api/v1/all',imageRoutes )

//USER ROUTES
app.use('/api/v1/user', userRoutes )

//ADMIN ROUTES
app.use('/api/v1/admin', adminRoutes)

//DOCTOR ROUTES
app.use('/api/v1/doctor', doctorRoutes)

//STATIC FILE
app.use(express.static(path.join(__dirname, './client/build')));

// Serve index.html for any other routes
app.get("*", function (req,res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
});

app.listen(PORT,()=>{
    console.log(`App is Running in the ${process.env.NODE_MODE} Mode on the port ${PORT}`.bgMagenta)
})


