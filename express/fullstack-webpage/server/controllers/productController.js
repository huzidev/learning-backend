import db from '../models/index.js';

const Product = db.products;
const Review = db.reviews;

// ADD PRODUCT
const addProduct = async (req, res) => {
    let info = {
        image : req.file.path,
        title : req.body.title,
        price : req.body.price,
        description : req.body.description
    }
}