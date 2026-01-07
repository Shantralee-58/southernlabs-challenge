const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/submit", async (req,res)=>{
  const {studentName, studentEmail, studentCourse, currentLevel, passed, duration} = req.body;

  // Send email to student
  let transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{ user:"idah@southernlabs.com", pass:"YOUR_EMAIL_PASSWORD" }
  });

  const mailOptions = {
    from:"idah@southernlabs.com",
    to:studentEmail,
    subject:`SouthernLabs Level ${currentLevel} Result`,
    text:`Hi ${studentName},\nYou ${passed?"PASSED":"FAILED"} level ${currentLevel} in ${duration} seconds.\nCourse: ${studentCourse}`
  };

  // Send copy to admin
  const adminOptions = {...mailOptions, to:"idah@southernlabs.com"};

  try{
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(adminOptions);
    res.send({status:"success"});
  }catch(err){
    console.error(err);
    res.status(500).send({status:"error", error:err.message});
  }
});

app.listen(3000,()=>console.log("Server running on http://localhost:3000"));

