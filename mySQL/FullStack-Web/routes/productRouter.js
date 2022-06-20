import productController from '../controllers/productController'
import reviewController from '../controllers/reviewController'

const router = require('express').Router()

router.post('/addProduct', productController.addProduct)


router.get('/allProducts', productController.getAllProducts)

router.get('/published', productController.getPublishedProduct)

// Review's Url And Controller
router.post('addReview', reviewController.addReview)
router.get('getAllReviews', reviewController.getAllReviews)


router.get('/:id', productController.getOneProduct)

router.put('/:id', productController.updateProduct)

router.delete('/:id', productController.deleteProduct)

module.exports = router