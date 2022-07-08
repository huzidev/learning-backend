import reviewController from '../controllers/reviewController';

const routerReview  = require('express').Router()

// for adding review
routerReview.post('/addReview', reviewController.addReview)

// for getting all reviews respective to the product
routerReview.get('/allReviews', reviewController.getAllReviews)

module.exports = routerReview