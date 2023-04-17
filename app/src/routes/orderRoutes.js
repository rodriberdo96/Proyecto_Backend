const express =  require('express')
const routesOrder = express.Router()

const OrderController = require('../controllers/orderController')
const orderController = new OrderController()

const {verifyUserToken} = require('../middleware/tokenLogin')


routesOrder.post('/', verifyUserToken, orderController.generateOrder)
routesOrder.get('/', verifyUserToken, orderController.getAllOrders)


module.exports = { routesOrder }