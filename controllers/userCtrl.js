import userModel from './../models/userModels.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import moment from 'moment'
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
dotenv.config()


const getAllUser=async(req,res)=>{
    try {
        let user= await userModel.find({})
        res.status(200).send({
            message:"Fetched data successfully",
            user
        })
        
    } catch (error) {
        res.status(500).send({
            message:"Internel server error",
            error:`error are ${error}`
        })
    }
}

const getAllUserByID=async(req,res)=>{
    try {
        let user= await userModel.findById({_id:req.params.id})
        res.status(200).send({
            message:"Fetched data by ID successfully",
            user
        })
        
    } catch (error) {
        res.status(500).send({
            message:"Internel server error",
            error:`error are ${error}`
        })
    }
}

const loginController=async(req,res)=>{
    try {
        let user=await userModel.findOne({email:req.body.email})
        if(!user){
            return res.status(200).send({
                message:"User not found",
                success:false
            })
        }
        const isMatch= await bcrypt.compare(req.body.password,user.password)
        if(!isMatch){
            return res.status(200).send({
                message:"Invalid Email Id Or Password",
                success:false
            })
        }
        const token = jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET, {expiresIn:'1d'})
        res.status(200).send({
            message:"Login succesfully",
            success:true,
            token
        })
        
    } catch (error) {
        res.status(500).send({
            message:"Internel Server Error",
            error:`Error Message  is ${error.message}`
        })
    }

}

const registerController=async(req,res)=>{
    try {
        const existingUser=await userModel.findOne({email:req.body.email})
        if(existingUser){
            return res.status(200).send({
                message:`User with ${req.body.email} already exists`,
                success:false
            })
        }
            const password=req.body.password
            const salt= await bcrypt.genSalt(10)
            const hashPassword= await bcrypt.hash(password,salt)
            req.body.password=hashPassword
            const newUser= new userModel(req.body)
            await newUser.save()

            res.status(201).send({
                message:"Register Successfully",
                success:true
            })
        
    } catch (error) {
        res.status(500).send({
            message:"Internel Server Error",
            error:`Error Message  is ${error.message}`
        })
    }
}

const authController=async(req,res)=>{
try {
    const user= await userModel.findById({_id: req.body.userId});
    user.password=undefined;
    if(!user){
        return res.status(200).send({
            message:"User not found",
            success:false
        })
    }
    else{
        res.status(200).send({
            success:true,
            data:user
        })
    }
    
} catch (error) {
    res.status(500).send({
        message:"Internel Server Error",
        error:`Error Message  is ${error.message}`
    })
}
}

const applyDoctorController=async(req,res)=>{
    try {
        // console.log("Im starting");
        let newuser=await doctorModel({...req.body, status:'pending'})
        console.log('newUser',newuser);
        await newuser.save()
        let newDoctor=await doctorModel.findOne({email:req.body.email})
        console.log('newDoctor',newDoctor);
        const adminUser=await userModel.findOne({isAdmin:true})
        console.log('adminUser',adminUser);
        const notification=adminUser.notification
        notification.push({
            type:"apply-doctor-request",
            message:`${newDoctor.firstName} ${newDoctor.lastName} has Applied for a Doctor Acccount`,
            data:{
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastName,
                onClickPath:"/admin/doctors"
            }    
        })
        console.log('notification',notification);
        await userModel.findByIdAndUpdate(adminUser._id, {notification})
        res.status(201).send({
            success:true,
            message:"Doctor Account Applied Succesfully"
        })

    } catch (err) {
        res.status(500).send({
            message:"Internel Server error",
            success:false,
            error:`Error is ${err}`
        })
        
    }
}

const getAllNotificationController=async(req,res)=>{
    try {
        let user= await userModel.findById({_id:req.body.userId})
        let seennotification=user.seennotification
        let notification=user.notification
        seennotification.push(...notification)
        user.notification=[]
        user.seennotification=notification
        const updateUserNotification=await user.save()
        res.status(200).send({
            message:"All notification Marked as read successfully",
            success:true,
            data: updateUserNotification
        })

    } catch (error) {
        res.status(500).send({
            message:"Error in notification",
            success:false,
            error:`Error is ${error}`
        })
        
    }
}

const deleteAllNotificationController=async(req,res)=>{
    try {
        let user=await userModel.findOne({_id:req.body.userId})
        user.notification=[];
        user.seennotification=[]
        const updateUser=await user.save()
        updateUser.password=undefined
        res.status(200).send({
            success:true,
            message:"Notification Deleted succesfully",
            data:updateUser
        })

    } catch (error) {
        res.status(500).send({
            message:"Error in notification",
            success:false,
            error:`Error is ${error}`
        })
    }
}

const getAllDoctorsController = async (req, res) => {
    //console.log(req.body);
    try {
        let doctors = await doctorModel.find({ status: "approved" });
        // console.log(doctors);
        let user=await userModel.find({_id:req.body.userId})
        // console.log(user);
        res.status(200).json({
            success: true,
            message: "Doctors list fetched successfully",
            data: doctors,
            user:user
        });
    } catch (error) {
        console.error("Error while fetching doctors:", error);
        res.status(500).json({
            message: "Error while fetching doctors",
            success: false,
            error: error.message
        });
    }
};

const bookAppointmentController=async(req,res)=>{
    try {
        let date= moment(req.body.date, "DD-MM-YYYY").toISOString()
        // console.log("users Info",req.body.userInfo);
        // console.log("doctors Info",req.body.doctorInfo);
        let time= moment(req.body.time, "HH:mm").toISOString()
        const doctorId=await req.body.doctorInfo._id
        let existingAppointment=await appointmentModel.findOne({
            date,
            time,
            doctorId
        })
        // console.log('existingAppointment',existingAppointment);
        if(existingAppointment){
            return res.status(400).send({
                success:false,
                message:"This Appointment Slot is already booked , Please anothor time or Other doctor"
            })
        }
         // If the slot is available, create a new appointment
        req.body.date=date
        req.body.time=time
        req.body.status= "pending"
        let newAppointment=new appointmentModel(req.body)
        // console.log('newAppointment',newAppointment);
        await newAppointment.save()
        let user=await userModel.findOne({_id: req.body.doctorInfo.userId})
        user.notification.push({
            type:"New-appointment-request",
            message:`A new Appointment Request from ${req.body.userInfo.name}`,
            onClickPath:"/user/appointments"
        })
        await user.save()
        // console.log('user',user);
        res.status(200).send({
            success:true,
            message:"Appointment Book successfully",
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while booking appointment",
            error
        })
    }
}

const bookingAvailabilityController=async(req,res)=>{
    try {
        let date= moment(req.body.date, "DD-MM-YYYY").toISOString();
        // console.log("date",date);
        let fromTime=moment(req.body.time, "HH:mm").subtract(1, "hours").toISOString();
        // console.log("fromTime",fromTime);
        let toTime=moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
        // console.log("toTime",toTime);

        let doctorId=req.body.doctorId
        const appointments=await appointmentModel.find({
            doctorId,
            date,
            time:{
                $gte: fromTime,
                $lte: toTime
            }
        })
        console.log("appointments",appointments);
        if (appointments.length >0) {
            return res.status(200).send({
                message:"Appointment Not Available at this Moment",
                success:false
            })
        } else {
            return res.status(200).send({
                success:true,
                message:"Appointment is Available AT the Time"
            })
        }

        
    } catch (error) {
        console.error("Error in bookingAvailabilityController:", error);
      return  res.status(500).send({
            success:false,
        message:"Error In Booking",
        error
        })
    }
}



const userAppointmentController=async(req,res)=>{
    try {
        let appointments=await appointmentModel.find({userId:req.body.userId})
        res.status(200).send({
                message:"User Appointment Fetched Successfully",
                success:true,
                data:appointments
            })
        
    } catch (error) {
        res.status(500).send({
            success:false,
        message:"Error In User Appointments",
        error
        })
    }
}

const userProfileController=async(req,res)=>{
    try {
        let user=await userModel.findOne({_id:req.body.userId})
        res.status(200).send({
                message:"Single User Info Fetched succesully",
                success:true,
                data:user
            })
        
    } catch (error) {
        res.status(500).send({
            success:false,
        message:"Error In Single User Profile",
        error
        })
    }
}

const updateUserProfileController=async(req,res)=>{
    try {
        let user = await userModel.findOneAndUpdate(
          { _id: req.body.userId },
          req.body
        );
        res.status(201).send({
          message: "User Profile Updated",
          success: true,
          data: user,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "User Profile Update Issue",
          error,
        });
      }
}


export default {
    loginController,
    registerController,
    getAllUser,
    getAllUserByID,
    authController,
    applyDoctorController,
    getAllNotificationController,
    deleteAllNotificationController,
    getAllDoctorsController,
    bookAppointmentController,
    bookingAvailabilityController,
    userAppointmentController,
    userProfileController,
    updateUserProfileController
}