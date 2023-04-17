require('dotenv').config()
const sendEmail = require('../utils/nodemailer')


const userEmail = async (user) => {
    let emailRecipient = process.env.ADMIN_MAIL + ' , ' + user.user;
    let tittleEmail = `Nuevo registro con el username  ${user.email}`
    let bodyEmail = `<h1>Se ha registrado en el Proyecto Final Backend de Rodrigo: </h1>
                <p> Usuario  : ${user.email} </p>
                <p> Nombre   : ${user.name}</p>
                <p> Apellido : ${user.lastname}</p>
                <p> Direccion : ${user.address}</p>
                <p>Gracias Por Registrarse</p>`
    
    
    await sendEmail(emailRecipient, bodyEmail, tittleEmail)
}

module.exports = userEmail