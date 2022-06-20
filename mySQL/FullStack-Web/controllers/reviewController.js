import db from '../models'

const Review = db.reviews

// FUNCTIONS

// Add Review

const addReview = async (req, res) => {

    let data = {
        rating : req.body.rating, // rating is been defined in reviewModels
        description : req.body.description
    }

    const review = await Review.create(data)
    res.status(200).send(review)

}