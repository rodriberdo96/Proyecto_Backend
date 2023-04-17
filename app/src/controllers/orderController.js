const OrderServices = require('../services/orderServices')
const orderServices = new OrderServices()

class OrderController {

    async generateOrder(req, res){
        try{
            const order = await orderServices.generateOrder(req.body.idCart)
            res.status(200).json(order)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    async getAllOrders(req, res){
        try{
            const orders = await orderServices.getAllOrders()
            res.status(200).json(orders)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    async getOrderById(req, res){
        try{
            const order = await orderServices.getOrderById(req.params.id)
            res.status(200).json(order)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    async getOrdersByUser(req, res){
        try{
            const tokenHeader = req.headers.authorization || req.body.token || req.query.token || req.headers['x-access-token']
            const orders = await OrderController.orderServices.getOrdersByUser(tokenHeader)
            res.status(200).json(orders)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}

module.exports = OrderController