import express from 'express'
import authMiddlewar from '../middlewares/authMiddlewar.js'
import Controller from '../controllers/doctorCtrl.js'

const router=express.Router()

//POST SINGLE DOC INFO
router.post('/getDoctorInfo', authMiddlewar, Controller.getDoctorInfoController  )

//POST UPDATE PROFILE 
router.post('/updateProfile', authMiddlewar, Controller.updateProfileController  )

//POST GET SINGLE DOC INFO
router.post('/getDoctorById', authMiddlewar, Controller.getDoctorByIdController  )

//GET APPOINTMENTS(get)
router.post('/doctor-appointments', authMiddlewar, Controller.doctorAppointmentsController  )


//POST UPDATE STATUS
router.post('/update-status', authMiddlewar, Controller.updateStatusController  )

export default router