import productController from '../controllers/productController'

const router = require('express').Router()

router.post('/addProduct', productController.addProduct)