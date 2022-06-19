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

    const product = await Product.create(info)
    res.status(200).send(product)
    console.log(product);
}

// get products

const getAllProducts = async (req, res) => {
    let products = await Product.findAll({})
    res.status(200).send(products)
}

// get single product

const getOneProduct = async (req, res) => {
    let id = req.params.id
    let products = await Product.findOne({where : { id : id }})//id at left is key and id at right is the id we wanted to search for req.params.id
    // we can also create like tittle = some tittle etc
    res.status(200).send(products)
}