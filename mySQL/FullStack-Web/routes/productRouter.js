import productController from '../controllers/productController'

const router = require('express').Router()

router.post('/addProduct', productController.addProduct)


router.get('/allProducts', productController.getAllProducts)

router.get('/published', productController.getPublishedProduct)


router.get('/:id', productController.getOneProduct)

router.put('/:id', productController.updateProduct)

router.delete('/:id', productController.deleteProduct)
