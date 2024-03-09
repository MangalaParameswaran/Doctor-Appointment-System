import express from 'express'
import Controller from '../controllers/userCtrl.js'
import authMiddlewar from '../middlewares/authMiddlewar.js'

const router=express.Router()

router.get('/',Controller.getAllUser)
router.get('/:id',Controller.getAllUserByID)

//LOGIN
router.post('/login',Controller.loginController)

//REGISTER
router.post('/register', Controller.registerController)

//AUTH
router.post('/getUserData',authMiddlewar,Controller.authController)

//APPLY DOCTOR
router.post('/apply-doctor',authMiddlewar,Controller.applyDoctorController)

//ADMIN GET DOCTOR NOTIFICATION 
router.post('/get-all-notification',authMiddlewar ,Controller.getAllNotificationController)

//ADMIN DELETE DOCTOR NOTIFICATION 
router.post('/delete-all-notification',authMiddlewar ,Controller.deleteAllNotificationController)

//GET ALL DOCTOR  
router.post('/getAllDoctors',authMiddlewar ,Controller.getAllDoctorsController)

//BOOK APPOINTMENT  
router.post('/book-appointment',authMiddlewar ,Controller.bookAppointmentController)

//BOOKING AVAILABILITY 
router.post('/booking-availability',authMiddlewar ,Controller.bookingAvailabilityController)

//APPOINTMENT LIST 
router.post('/user-appointments',authMiddlewar ,Controller.userAppointmentController)

//USER PROFILE get 
router.post('/user-profile',authMiddlewar ,Controller.userProfileController)

//USER PROFILE UPDATED 
router.post('/update-profile',authMiddlewar ,Controller.updateUserProfileController)

export default router