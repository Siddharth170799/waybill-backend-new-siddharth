import mongoose from "mongoose";


const WaybillDetails1=mongoose.Schema({
  BookingType                          :{type:String},
  BDCode                     :{type:String},
  Destination:{type:String},
  ConsignorName:{type:String},
  ConsignerEmail:{type:String},
  ConsignorPhoneNumber:{type:Number},
  ConsignorAddress:{type:String},
  ConsignorGSTNumber:{type:Number},
  ConsigneeName:{type:String},
  ConsigneeEmail:{type:String},
  ConsigneePhoneNumber:{type:Number},
  ConsigneeAddress:{type:String},
  GSTNumber:{type:Number},
  NumberofArticles:{type:Number},
  Weight:{type:Number},
  ConsignmentValue:{type:Number},
  Charges:{type:Number}
})

const WaybillDetails= mongoose.model("waybilldetails",WaybillDetails1)
export default WaybillDetails