const ProductsServices = require('../services/productsServices')
const productsServices = new ProductsServices()


class productsControllers {

    async getAllProducts(req, res) {
        try {
            const allProducts =  await productsServices.getAllProducts()
            res.status(200).json(allProducts)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async getProductById(req, res) {
        try {
            const productById = await productsServices.getByIdProduct(req.params.id)
            if (productById != undefined) {
                return res.status(200).json(productById)
            } else {
                return res.status(404).json({ error : 'El producto no existe' })
            }
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async addProduct(req, res) {
        try {
            const newProduct = await productsServices.saveProduct(req.body) 
            res.status(200).json(newProduct)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async updateProduct(req, res) {
        try {
            const updateP = await productsServices.updateProduct(req.params.id, req.body)
            res.status(200).json(updateP)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async deleteProduct(req, res) {
        try {
            const deleteP = await productsServices.deleteProduct(req.params.id)
            res.status(200).json(deleteP)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async getProductsByCategory(req, res) {
        try {
            const productsByCategory = await productsServices.getProductsByCategory(req.params.category)
            if (productsByCategory != undefined) {
                return res.status(200).json(productsByCategory)
            } else {
                return res.status(404).json({ error : 'Categoria no encontrada' })
            }
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}


module.exports = productsControllers