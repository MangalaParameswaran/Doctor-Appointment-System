import mongoose from "mongoose";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    userImage: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "first name is required"],
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
    },
    phone: {
      type: Number,
      required: [true, "phone number is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      validate: {
        validator: validateEmail,
        message: (props) => `${props.value} is not a valid Email`,
      },
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    specialization: {
      type: String,
      required: [true, "specialization is required"],
    },
    experience: {
      type: String,
      required: [true, "experience is required"],
    },
    feesPerConsaltation: {
      type: Number,
      required: [true, "fee is required"],
    },
    img:{
      type:String,
      default: false
    },
    status: {
      type: String,
      default: "pending",
    },
    timings: {
      type: Object,
      required: [true, "work timing is required"],
    },
  },
  { timestamps: true },
  {
    versionKey: false,
  }
);

const doctorModel = mongoose.model("doctors", doctorSchema);

export default doctorModel;
