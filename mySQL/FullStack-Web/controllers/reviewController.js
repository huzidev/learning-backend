import db from '../models'

const Review = db.reviews

// FUNCTIONS

// Add Review

const addReview = async (req, res) => {

    let data = {
        rating : req.body.rating // rating is been defined in reviewModels
    }

}