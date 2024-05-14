
import express from 'express';
import { createTransport } from 'nodemailer';
import cors from "cors";
import { generate } from 'randomstring'; 
import mongoose from 'mongoose';
import Email from './Schema/Schema.js';
import WaybillDetails from './Schema/Schema2.js';
import config from './config.js';

const app1 = express();
const port = 3000;
const app=express.Router()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app1.use('/check',app)


// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   // Other supported options...
// };
const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: 'boorgusiddharth@gmail.com',
    pass: 'vckm xqph izsk uthj'
  }
});

app.post('/send-otp',async (req, res) => {
  const { email } = req.body;
  console.log(email)
 
  const otp = generate({ length: 6, charset: 'numeric' });
  const saveDetails = new Email({
    Email:email,
    OTP:`${otp}`
  })

  const saveDetails2= await saveDetails.save()
  res.send({message:"posted details successfully",data:saveDetails2,status:200})

  const mailOptions = {
    from: 'boorgusiddharth@gmail.com',
    to: email,
    subject: 'OTP for login',
    text: `Your OTP is: ${otp}`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending OTP');
    } else {
      console.log('Email sent:', info.response);
      res.send('OTP sent successfully');
    }
  });
});

app.get('/get',async(req,res)=>{
  const details= await Email.find();
  res.send(details)
 

})

app.post('/post1',async(req,res)=>{
  try{
     const {bookingType,bdCode,destination, consignorName,  consignorEmail,consignorPhone, consignorAddress, consignorGST, consigneeName, consigneeEmail,consigneePhone, consigneeAddress, consigneeGST,numberofArticles, weight, consignmentValue,  charges }=req.body
  const details= new WaybillDetails({BookingType:bookingType,BDCode:bdCode,Destination:destination,ConsignorName:consignorName,ConsignerEmail:consignorEmail,ConsignorPhoneNumber:consignorPhone,ConsignorAddress:consignorAddress,ConsignorGSTNumber:consignorGST,
    ConsigneeName:consigneeName,ConsigneeEmail:consigneeEmail,ConsigneePhoneNumber:consigneePhone,ConsigneeAddress:consigneeAddress,GSTNumber:consigneeGST,NumberofArticles:numberofArticles,Weight:weight,ConsignmentValue:consignmentValue,Charges:charges})
  
    const details2= await details.save()
    res.send({message:"booking details",data:details2,status:200})}
    catch(err){
      console.log(err,"error sending the details to the database")
      res.send({message:"error sending details",status:500})
    }
 

})

app.get('/get1',async(req,res)=>{
  try{
    const details= await WaybillDetails.find()
    res.send(details)
  }
  catch(err){
       console.log(err,"error occurred")
       res.send({message:"error occurred",status:500})
  }
})

// mongoose.connect('mongodb://localhost:27017/wire')
// .then(()=>{
//     console.log("DB connected")
// })
mongoose.connect(config.MONGOOSE_URL)
.then(()=>{
  console.log("DB connected")
// mongoose.connect("mongodb+srv://boorgusiddharth:siddharthjuly99@siddharth.fiuilki.mongodb.net/?retryWrites=true&w=majority&appName=Siddharth")

})
app1.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
