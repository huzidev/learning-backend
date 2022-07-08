import productController from '../controllers/productController';

const routerProduct = require('express').Router()

routerProduct.post('/addProduct', productController.upload, productController.addProduct) // productController.upload for uploading images

routerProduct.get('/allProducts', productController.getAllProducts)

routerProduct.get('/:id', productController.getOneProduct)

routerProduct.put('/:id', productController.updateProduct)

routerProduct.delete('/:id', productController.deleteProduct)

module.exports = routerProduct