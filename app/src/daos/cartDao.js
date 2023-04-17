const { cartModel } = require ('../models/cartModel')
const logger = require('../utils/winston')


class CartDaoClass {
    constructor() {
        this.cart = []
    }

    async getAllCarts() {
        try {
            const carts = await cartModel.find({})
            return carts
        } catch (error) {
            logger.error("Error in getAllCarts-DAO: " + error)
        }
    }

    async getCartById(idCart) {
        try{
            const cartByUser = await cartModel.findById(idCart)
            return cartByUser
        } catch (error) {
            logger.error("Error in getCartById-DAO: " + error)
        }
    }

    async getCartByUser(idUser) {
        try{
            const cartByUser = await cartModel.find({user:idUser})
            return cartByUser
        } catch (error) {
            logger.error("Error in getCartByUser-DAO: " + error)
        }
    }

    async createCart(data) {
        try{
            const saveCart = await cartModel(data).save()
            return saveCart
        }catch(error){
            logger.error("Error in createCart-DAO: " + error)
        }
    }
 
    async deleteCart(idCart) { 
        try {
            const deleteCart = await cartModel.findByIdAndDelete(idCart)
            return deleteCart
        }catch (error) {
            logger.error("Error in deleteCart-DAO: " + error)
        }
    }

    async listProductsInCart(idCart) {
        try {
            const cartById = await cartModel.findById(idCart)
            return cartById
        }catch (error) {
            logger.error("Error in listProductsInCart-DAO: " + error)
        }
    }

    async addProductInCart(idCart, addProd) {
        try {
            const cartById = await cartModel.findById(idCart)
            if (cartById === null) {
                logger.warn("No se encontró el carrito")
            }
            const existProd = cartById.products.find(product => product.productId == addProd.productId)          
            if(existProd){
                const products = cartById.products.map(product => {
                    if(product.productId === addProd.productId){
                        product.qty += addProd.qty
                        product.totalPrice = product.qty * product.priceUnit
                    }
                    return product
                } )
                cartById.products = products
            } else {
                cartById.products.push(addProd)
            }
            const updateCart = await cartModel.findByIdAndUpdate(idCart, cartById, {new: true})
            return updateCart
        }catch (error) {
            logger.error("Error en addProductInCart-DAO: " + error)
        }
    }
   
    async deleteProductInCart(idCart, idProduct) {
        try{
            const cartById = await cartModel.findById(idCart)
            if (cartById===null) {
                logger.warn("No se encontró el carrito")
            }
            const productsNew = cartById.products.filter(product => product.productId != idProduct)
            cartById.products = productsNew
            const cartUpdated = await cartModel.findByIdAndUpdate(idCart, cartById)
            return cartById 
        }catch (error) {
            logger.error("Error en deleteProductInCart-DAO: " + error)
        }
    } 

    async modifyProductInCart(idCart, idProduct, qty) {
        try{
            const cartById = await cartModel.findById(idCart)
            if (cartById===null) {
                logger.warn("No se encontró el carrito")
            }
            const productsCart = cartById.products.find(product => product.productId === idProduct)
            if(productsCart){
                const products = cartById.products.map(product => {
                    if(product.productId === idProduct){
                        product.qty =+ qty
                        product.totalPrice = qty * product.priceUnit
                    }
                    return product
            })
                cartById.products = products
                const cartUpdated = await cartModel.findByIdAndUpdate(idCart, cartById)
                return cartUpdated
            } else {
                logger.warn("No se encontró el producto en el carrito")
            }
        } catch (error) {
            logger.error("Error en modifyProductInCart-DAO: " + error)
        }
    }
}

module.exports = CartDaoClass