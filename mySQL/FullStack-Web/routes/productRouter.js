import productController from '../controllers/productController'

const routerProduct = require('express').Router()

routerProduct.post('/addProduct', productController.addProduct)


routerProduct.get('/allProducts', productController.getAllProducts)

routerProduct.get('/published', productController.getPublishedProduct)

// // get Product Reviews
// routerProduct.get('/productReviews', productController.getProductReviews)

routerProduct.get('/:id', productController.getOneProduct)

routerProduct.put('/:id', productController.updateProduct)

routerProduct.delete('/:id', productController.deleteProduct)

module.exports = routerProduct

// don't forget to use '/' with paths for example /allProducts, /addProduct