require('nodemailer')
const sendMail = () => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "myemail@gmail.com",
            pass: "password"
        }
    })


    const mailOptions = {
        from: 'The Idea project',
        to: toAddress,
        subject: 'My first Email!!!',
        text: "This is my first email. I am so excited!"
    };

}

module.exports = sendMail