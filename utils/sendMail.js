const nodemailer = require("nodemailer");

exports.sendEmail = async(subject, message, send_to) => {
    let config = {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    }
    let transporter = nodemailer.createTransport(config);

    let options = {
        from: process.env.EMAIL,
        to: send_to,
        subject: subject,
        html: message
    }
    transporter.sendMail(options, function(err, info) {
        if(err){
            console.log(err);
        }else{
            // console.log()
        }
    })
}