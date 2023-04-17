const CartService = require('../services/cartServices')
const cartServices = new CartService()


class cartControllers {

    async getAllCarts(req, res) {
        try {
            const allCarts = await cartServices.getAllCarts()
            res.status(200).json(allCarts)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async createCart(req, res) {
        try {
            const tokenHeader = req.headers.authorization || req.body.token || req.query.token || req.headers['x-access-token'];
            const newCart = await cartServices.createCart(req.body, tokenHeader) 
            res.status(200).json(newCart)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async deleteCart(req, res) {
        try {
            const deleteCart = await cartServices.deleteCart(req.params.id)
            res.status(200).json(deleteCart)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async productsinCart(req, res) {
        try {
            const productsInCartById = await cartServices.listProductsInCart(req.params.id)
            res.status(200).json(productsInCartById)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async addProductInCart(req, res) {
        try {
            const qty = parseInt(req.body.qty)
            const idCart = req.params.id
            const addProduct = await cartServices.addProductInCart(idCart, req.body.idProduct, qty)
            res.status(200).json(addProduct)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async deleteProductInCart(req, res) {
        try {
            const deleteProduct = await cartServices.deleteProductInCart(req.params.idcart, req.params.idprod)
            res.status(200).json(deleteProduct)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async modifyProductInCart(req, res) {
        try {
            const qty = parseInt(req.body.qty)
            const idCart = req.params.id
            const modifyCart = await cartServices.modifyProductInCart(idCart, req.body.idprod, qty)
            res.status(200).json(modifyCart)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

module.exports = cartControllers