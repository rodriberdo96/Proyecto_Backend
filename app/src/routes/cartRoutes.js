const express =  require('express')
const routesCart = express.Router()

const cartControllers = require('../controllers/cartController')
const cartsControllers = new cartControllers

const {verifyUserToken} = require('../middleware/tokenLogin')


routesCart.get('/', verifyUserToken, cartsControllers.getAllCarts)
routesCart.post('/', verifyUserToken, cartsControllers.createCart)
routesCart.delete('/:id', verifyUserToken, cartsControllers.deleteCart)
routesCart.get('/:id/products', verifyUserToken, cartsControllers.productsinCart)
routesCart.post('/:id/products', verifyUserToken, cartsControllers.addProductInCart)
routesCart.delete('/:idcart/products/:idprod', verifyUserToken, cartsControllers.deleteProductInCart)
routesCart.put('/:id', verifyUserToken, cartsControllers.modifyProductInCart)


module.exports = { routesCart }