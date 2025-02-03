require("nodemailer").nodemailer(); 
require("dotenv").config(); 


const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASSWORD, 
  },
});


mailer.verify((error, success) => {
  if (error) {
    console.error("Mailer configuration error:", error);
  } else {
    console.log("Mailer is configured and ready to send emails");
  } 

  
});

module.exports = mailer;
