import reviewController from '../controllers/reviewController'

const routerReview = require('express').Router()

// Review's Url And Controller
routerReview.post('/addReview', reviewController.addReview)
routerReview.get('/allReviews', reviewController.getAllReviews)

module.exports = routerReview
