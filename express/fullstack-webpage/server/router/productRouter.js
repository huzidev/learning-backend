import productController from '../controllers/productController';

const routerProduct = require('express').Router()

// for adding product
routerProduct.post('/addProduct', productController.upload, productController.addProduct) // productController.upload for uploading images

// for getting all products
routerProduct.get('/allProducts', productController.getAllProducts)

// for getting single product with specific reviews about that
routerProduct.get('/:id', productController.getOneProduct)

// for getting reviews about specific product
routerProduct.get('/productReviews/:id', productController.getProductReviews)

// for updating product
routerProduct.put('/:id', productController.updateProduct)

// for deleting product
routerProduct.delete('/:id', productController.deleteProduct)

module.exports = routerProduct