const {createTransport} = require('nodemailer')
require('dotenv').config()


const sendEmail = async (emailRecipient, bodyEmail, tittleEmail) =>  {
    
    const MAIL = process.env.ADMIN_MAIL
    const PASSW = process.env.PASS

    const transporter = createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: MAIL,
            pass: PASSW
        }
    })

    const mailOptions = {
        from: MAIL,
        to: emailRecipient,
        subject: tittleEmail,
        html: `<div>${bodyEmail}</div>`
    }

    const info = await transporter.sendMail(mailOptions)
}

module.exports = sendEmail