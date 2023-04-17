const { orderModel } = require ('../models/orderModel')
const logger = require('../utils/winston')

class OrderDao {

    async generateOrder(order) {
        try{
            const generatedOrder = await orderModel(order).save()
            return generatedOrder
        }catch (error) {
            logger.error("Error generateOrder-DAO: " + error)
        }
    }

    async getAllOrders() {
        try{
            const allOrders = await orderModel.find({})
            return allOrders
        }catch (error) {
            logger.error("Error getAllOrders-DAO: " + error)
        }
    }

    async getOrderById(id) {
        try{
            const orderById = await orderModel.findById(id)
            return orderById
        }catch (error) {
            logger.error("Error getOrderById-DAO: " + error)
        }
    }

    async getOrdersByUser(user) {
        try{
            const ordersByUser = await orderModel.find({user:user})
            return ordersByUser
        }catch (error) {
            logger.error("Error getOrdersByUser-DAO: " + error)
        }
    }
}

module.exports = OrderDao