require('dotenv').config()
const sendEmail = require('../utils/nodemailer')


const orderEmail = async (order, cart) => {
    let prodDetail = ''
    let numTotalProd = 0
    let totalProdPrice = 0

    cart.products.forEach(prod => {
        numTotalProd += prod.qty
        totalProdPrice += prod.totalPrice
        prodDetail += `<li> Producto : ${prod.name}, Precio unitario : ${prod.priceUnit}, Cantidad: ${prod.qty}, Precio total: ${prod.totalPrice} </li>`
    })

    let emailRecipient = process.env.ADMIN_MAIL + ' , ' + order.user
    let tittleEmail = `Orden generada número: ${order.numberOrder}`
    let bodyEmail = `<h1>Se ha realizado la siguiente orden de compra:</h1>
                    <p>Número de orden: ${order.numberOrder}</p>
                    <p>Estado de la orden: ${order.stateOrder}</p>
                    <p>Fecha de la orden: ${order.timestamp}</p>
                    <p>Usuario: ${order.user}</p>
                    <p>Dirección: ${order.address}</p>
                    <p>Productos: <ul>${prodDetail}</ul></p>
                    
                    <p>Cantidad total: ${numTotalProd}</p>
                    <p>Precio total: ${totalProdPrice}</p>`

    await sendEmail(emailRecipient, bodyEmail, tittleEmail)
}

module.exports = orderEmail