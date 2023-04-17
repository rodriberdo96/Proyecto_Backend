const express =  require('express')
const routesProducts = express.Router()

const prodControllers = require('../controllers/productsController')
const productsControllers = new prodControllers()

const {verifyUserToken} = require('../middleware/tokenLogin')


routesProducts.get('/', verifyUserToken, productsControllers.getAllProducts)
routesProducts.get('/:id', verifyUserToken, productsControllers.getProductById)
routesProducts.post('/', verifyUserToken, productsControllers.addProduct)
routesProducts.put('/:id', verifyUserToken,  productsControllers.updateProduct)
routesProducts.delete('/:id', verifyUserToken,  productsControllers.deleteProduct)
routesProducts.get('/category/:category', verifyUserToken, productsControllers.getProductsByCategory)


module.exports = { routesProducts }