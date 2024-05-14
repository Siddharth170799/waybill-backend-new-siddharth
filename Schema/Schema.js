import mongoose from "mongoose";


const email1=mongoose.Schema({
    Email:{type:String},
    OTP:{type:Number}
})

const Email=mongoose.model("email and otp details",email1)
export default Email