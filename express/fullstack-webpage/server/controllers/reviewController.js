// FOR MYSQL
import db from '../models/index.js';

const Review = db.reviews

// ADD REVIEW
const addReview = async (req, res) => {
    const id = req.body.pid // means inside body of that specific product's id in which we wanted to add review
    let data = {
        pid : id,
        rating : req.body.rating,
        description : req.body.description
    }
}