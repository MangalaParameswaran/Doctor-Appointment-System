import mongoose from "mongoose";

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

const userSchema= new mongoose.Schema({
    img:{
        type:String,
        required:[true, "Email is required"],
    },
    name:{
        type: String,
        required: [true, "Name is required"]
    },
    lastName:{
        type: String,
        default:false
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        validate:{
            validator:validateEmail,
            message:props => `${props.value} is not a valid Email`
        }
    },
    password:{
        type: String,
        required: [true, "Email is required"]
    },
    address:{
        type:String,
        default:false,
    },
    phone:{
        type:Number,
        default:false,
    },
    age:{
        type:Number,
        default:false,
    },
    img:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe9Rhez2I79u2KwdU9xOP6V0UlQCKsAy7eCnY_CZlupQ&s"
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    isDoctor:{
        type:Boolean,
        default:false,
    },
    notification:{
        type:Array,
        default:[],
    },
    seennotification:{
        type:Array,
        default:[],
    },
},
)

const userModel=mongoose.model("users",userSchema)

export default userModel