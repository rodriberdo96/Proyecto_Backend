const cartDaos = require('../daos/cartDao')
const cartDao = new cartDaos()
const ProductsDaoClass = require('../daos/productDao')
const productDao = new ProductsDaoClass()
const AuthDaoClass = require('../daos/authDao')
const authDao = new AuthDaoClass()
const logger = require('../utils/winston')
const moment = require('moment')


class CartService {
    constructor() {
        this.cart = []
    }

    async getAllCarts() {
        try {
            const allCarts = await cartDao.getAllCarts()
            return allCarts
        } catch (error) {
            logger.error("Error in getAllCars-Services: " + error)
        }
    }

    async createCart(cart, tokenHeader) {
        try{
            const user = await authDao.getUserByToken(tokenHeader) 
            cart.user = user.email
            cart.address = user.address
            cart.timestamp = moment().format('L LTS')
            cart.products = []
            const newCart = await cartDao.createCart(cart)
            return newCart
        }catch(error){
            logger.error("Error in createCart-Services: " + error)
        }
    }

    async deleteCart(idCart) { 
        try {
            if (idCart.length == 24) {
                await cartDao.deleteCart(idCart)
            } else {
                logger.warn('El ID ingresado es incorrecto')
            }
        }catch (error) {
            logger.error("Error in deleteCart-Services: " + error)
        }
    }

    async listProductsInCart(idCart) {
        try {
            if (idCart.length == 24) {
                const cartById = await cartDao.listProductsInCart(idCart)
                return cartById.products
            } else {
                logger.warn('El ID ingresado es incorrecto')
            }
        }catch (error) {
            logger.error("Error in listProductsInCart-Services: " + error)
        }
    }

    async addProductInCart(idCart, idProduct, qty) {
        try {
            const productById = await productDao.getByIdProduct(idProduct)
            if (productById.idProduct === null) {
                logger.warn('Producto no encontrado')
            }
            const addProd ={
                productId: idProduct,
                name: productById.name,
                description: productById.description,
                category: productById.category,
                priceUnit: productById.price,
                qty: qty,
                totalPrice: productById.price * qty
            }
            const cartUpdated = await cartDao.addProductInCart(idCart, addProd)
            return cartUpdated
        }catch (error) {
            logger.error("Error en addProductInCart-Services: " + error)
        }
    }
    
    async deleteProductInCart(idCart, idProduct) {
        try{
            const cartUpdated = await cartDao.deleteProductInCart(idCart, idProduct)
            return cartUpdated
        }catch (error) {
            logger.error("Error en deleteProductInCart-Services: " + error)
        }
    } 

    async modifyProductInCart(idCart, idProduct, qty) {
        try{
            const cartUpdated = await cartDao.modifyProductInCart(idCart, idProduct, qty)
            return cartUpdated
        } catch (error) {
            logger.error("Error en modifyProductInCart-Services: " + error)
        }
    }
}

module.exports = CartService
