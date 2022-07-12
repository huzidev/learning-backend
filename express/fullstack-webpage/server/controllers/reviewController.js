// FOR MYSQL
import db from '../models/index.js';

const Review = db.reviews

// ADD REVIEW
const addReview = async (req, res) => {
    const id = req.body.id // means inside body of that specific product's id in which we wanted to add review
    let data = {
        fid : id,
        rating : req.body.rating,
        description : req.body.description
    }
    const review = await Review.create(data)
    res.status(200).send(review)
}

// GET ALL REVIEWS
const getAllReviews = async (req, res) => {
    const reviews = await Review.findAll({})
    res.status(200).send(reviews)
}

module.exports = {
    addReview,
    getAllReviews
}