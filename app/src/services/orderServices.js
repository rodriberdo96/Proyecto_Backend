const logger = require('../utils/winston')
const moment = require('moment')
require('dotenv').config()
const OrderDao = require('../daos/orderDao')
const orderDao = new OrderDao()
const AuthDaoClass = require('../daos/authDao')
const authDao = new AuthDaoClass()
const CartDaoClass = require('../daos/cartDao')
const cartDao = new CartDaoClass()
const orderEmail = require('../templates/newOrder')


class OrderServices {

    async generateOrder(idCart){
        try{
            let numOrder = ''
            const cartById = await cartDao.getCartById(idCart)
            const orders = await orderDao.getAllOrders()
            if(orders.length === 0){
                numOrder = '001'
            } else {
                const lastOrder = orders[orders.length - 1]
                const numLastOrder = lastOrder.numberOrder.slice(2)
                const numNextOrder = parseInt(numLastOrder) + 1
                numOrder = numNextOrder.toString().padStart(3, '0')
            } 
            if(cartById){
                const order = {
                    numberOrder: numOrder,
                    stateOrder: 'Generada',
                    timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
                    user: cartById.user,
                    address: cartById.address,
                    products: cartById.products
                }
                const createdOrder = await orderDao.generateOrder(order)
                const sendMail = await orderEmail(createdOrder, cartById)
                return createdOrder
            }else{
                logger.warn('El carrito no existe - orderServices ')
            }
        } catch (error) { 
            logger.error("Error in generateOrder-Services " + error)
        }
    }

    async getAllOrders() {
        try{
            const orders = await orderDao.getAllOrders()
            return orders
        } catch (error) {
            logger.error("Error in getAllOrders-Services " + error)
        }
    }

    async getOrderById(idOrder) {
        try{
            const orderById = await orderDao.getOrderById(idOrder)
            if (orderById===null) {
                logger.warn('La orden buscada no existe')
            }
            return orderById
        } catch (error) {
            logger.error("Error in getOrderById-Services " + error)
        }
    }

    async getOrdersByUser(tokenHeader) {
        try{
            const user= await authDao.getUserFromToken(tokenHeader);
            const userID = user.email;
            const orders = await OrderServices.orderDAO.getOrdersByUser(userID)
            if (orders===null || orders.length === 0) {
                throw new Error('Orders not found');
            }
            return orders;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = OrderServices