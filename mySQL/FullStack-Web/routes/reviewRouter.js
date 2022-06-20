import reviewController from '../controllers/reviewController'

const routerReview = require('express').Router()

// Review's Url And Controller
router.post('addReview', reviewController.addReview)
router.get('allReviews', reviewController.getAllReviews)

module.exports = routerReview