import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModels.js";

const getDoctorInfoController = async (req, res) => {
  try {
    let doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      message: "Doctors data Fetched successfully",
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Doctor Details",
      error,
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    let doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      message: "Doctor Profile Updated",
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Doctor Profile Update Issue",
      error,
    });
  }
};

const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "Single Doc Info Fetched succesully",
      data: doctor,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Single Doctor Info",
      error,
    });
  }
};

const doctorAppointmentsController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    let appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });
    res.status(200).send({
      success: true,
      message: "Doctor Appointment Fetched succesully",
      data: appointments,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Doctor Appointments",
      error,
    });
  }
};

const updateStatusController = async (req, res) => {
  try {
    let { appointmentsId, status } = req.body;
    let appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    let user = await userModel.findOne({ _id: appointments.userId });
    let notification= user.notification
    notification.push({
      type: "Status-updated",
      message: `Your appointment has been updated ${status}`,
      onClickPath: "/doctor-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Doctor Appointment Status updated succesully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Update Status",
      error,
    });
  }
};

export default {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
};
