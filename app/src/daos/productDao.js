const { productsModel } = require ('../models/productModel')
const logger = require('../utils/winston')


class ProductsDaoClass {

    async getAllProducts(){
        try{
            const list = await productsModel.find({})
            return list
        }catch(error){
            logger.error("Error getAllProducts-DAO: " + error)
        }
    }

    async saveProduct(product){
        try{
            const saveProd = await productsModel(product).save()
            return saveProd
        }catch(error){
            logger.error("Error saveProducts-DAO: " + error)
        }
    } 

    async getByIdProduct(idProduct){
        try {
            const getByIdProd = await productsModel.findById(idProduct)
            return getByIdProd
        } catch(error){
            logger.error("Error in getByIdProduct-DAO: " + error)
        }
    }

    async updateProduct(idProduct, data){
        try {
            const updateProd = await productsModel.findByIdAndUpdate(idProduct, data)
            return updateProd
        } catch(error){
            logger.error("Error in updateProducts-DAO: " + error)
        }
    }
    
    async deleteProduct(idProduct){
        try {
            const deleteProd = await productsModel.findByIdAndDelete(idProduct)
            return deleteProd
        }catch (error) {
            logger.error("Error in deleteProduct-DAO: " + error)
        }
    } 

    async getProductsByCategory(category){
        try {
            const productsByCategory = await productsModel.find({ category })
            return productsByCategory
        } catch (error) {
            logger.error("Error in getProductsByCategory: " + error)
        }
    }
}

module.exports = ProductsDaoClass