import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModels.js";



const getAllUsersController=async(req,res)=>{
    try {
        let users=await userModel.find({})
        res.status(200).send({
            message:"Users data list",
            success:true,
            data:users
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error fetching users data",
            error
        })
    }
}

const getAllDoctorsController=async(req,res)=>{
    try {
        let doctors=await doctorModel.find({})
        res.status(200).send({
            message:"Doctors data list",
            success:true,
            data:doctors
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while getting doctors data",
            error
        })
    }
}

//DOCTOR ACCOUNT STATUS
const changeAccountStatusController=async(req,res)=>{
    try {
        let { doctorId, status}=req.body
        let doctor=await doctorModel.findByIdAndUpdate(doctorId,{status});
        console.log("doctor",doctor);
        let user=await userModel.findOne({_id:doctor.userId});
         console.log('user',
         user);
        let notification=user.notification;
        notification.push({
            type:"doctor-account-request-updated",
            message:`Your Doctor Account Request Has ${status}`,
            onClickPath:'/notification'
        });
        user.isDoctor = status === "approved" ? true : false;
        await user.save();
        res.status(201).send({
            success:true,
            message:"Account Status Updated",
            data:doctor
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Account Status",
            error
        })
    }
}

//REJECT DOC 
const rejectDoctorController=async(req,res)=>{
    try {
        let { doctorId, status}=req.body
        let doctor=await doctorModel.findByIdAndUpdate(doctorId,{status});
        // console.log("doctor",doctor);
        let user=await userModel.findOne({_id:doctor.userId});
        //  console.log('user',
        //  user);
        let notification=user.notification;
        notification.push({
            type:"doctor-account-request-updated",
            message:`Your Doctor Account Request Has ${status}`,
            onClickPath:'/notification'
        });
        user.isDoctor = status === "reject" ? false : true;
        await user.save();
        res.status(201).send({
            success:true,
            message:"Doc Account Rejected Successfully",
            data:doctor
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Reject Account Status",
            error
        })
    }
}

const getAdminProfileController=async(req,res)=>{
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

const updateAdminProfileController=async(req,res)=>{
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
    getAllUsersController,
    getAllDoctorsController,
    changeAccountStatusController,
    getAdminProfileController,
    updateAdminProfileController,
    rejectDoctorController

}