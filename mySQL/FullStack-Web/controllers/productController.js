import db from '../models'

// CREATING MAIN MODEL for passing our data and get ours data from database
const Product = db.products
const Review = db.reviews

// main work

// create product

const addProduct = async (req, res) => {
    let info = {
        title : req.body.title,
        price : req.body.price,
        description : req.body.description,
        published : req.body.published ? req.body.published : false
    } 
}