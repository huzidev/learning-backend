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
    
    const product = await Product.create(info)
    res.status(200).send(product)
}

// GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
    let products = await Product.findAll({}) // since we will GET all products therefore we've used ({}) object
    res.status(200).send(products)
}


// GET SINGLE PRODUCT

const getOneProduct = async (req, res) => {
    // id for specific product
    let id = req.params.id
    let product = await Product.findOne({
        where : {
            pid : id // pid is for product id
        }
    })
    res.status(200).send(product)
}

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
    let id = req.params.id
    const product = await Product.update(req.body, { // req body for getting previous data about respective product
        // by getting previous data we can update that data otherwise we've to update it from the scratch
        where : {
            pid : id
        }
    })
    res.status(200).send(product)
}

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
    let id = req.params.id
    const product = await Product.destroy({
        where : {
            pid : id
        }
    })
}