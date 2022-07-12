import db from '../models'

const Review = db.reviews

// FUNCTIONS
// Add Review

const addReview = async (req, res) => {

    const id = req.body.id // IT SHOULDN'T BE req.params.id rather it should be req.body.pid as other inside data object are also
    //req.body.rating and req.body.description therefore it should also be req.body.pid
    let data = {
        fid : id, // fid is foreign id
        rating : req.body.rating, // rating is been defined in reviewModels
        description : req.body.description
    }
    const review = await Review.create(data)
    res.status(200).send(review)
}

// Get All Reviews

const getAllReviews = async (req, res) => {

    const reviews = await Review.findAll({})
    res.status(200).send(reviews)
}

module.exports = {
    addReview,
    getAllReviews,
}