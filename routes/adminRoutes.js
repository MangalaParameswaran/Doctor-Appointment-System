import express from 'express'
import authMiddlewar from '../middlewares/authMiddlewar.js'
import Controller from '../controllers/adminCtrl.js'

const router=express.Router()

//GET ALL USERS
router.get('/getAllUsers',authMiddlewar, Controller.getAllUsersController )

//GET ALL DOCTORS
router.get('/getAllDoctors',authMiddlewar, Controller.getAllDoctorsController )

//POST ACCOUNT STATUS
router.post('/changeAccountStatus',authMiddlewar, Controller.changeAccountStatusController )

// REJECT DOC ACCOUNT
router.post("/reject-doc",authMiddlewar, Controller.rejectDoctorController)

//ADMIN PROFILE get 
router.post('/admin-profile',authMiddlewar ,Controller.getAdminProfileController)

//ADMIN PROFILE UPDATED 
router.post('/update-profile',authMiddlewar ,Controller.updateAdminProfileController)


export default router