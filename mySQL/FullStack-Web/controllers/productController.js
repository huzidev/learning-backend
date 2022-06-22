import db from '../models'

// CREATING MAIN MODEL for passing our data and get ours data from database
const Product = db.products

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
    let product = await Product.findOne({
        where : { 
            id : id 
        }
    })//id at left is key and id at right is the id we wanted to search for req.params.id
    // we can also create like tittle = some tittle etc
    res.status(200).send(product)
}

// update Product

const updateProduct = async (req, res) => {
    let id = req.params.id
    const product = await Product.update(req.body, { //means we can update it by updating in just body
        where : {
            id : id
        }
    })
    res.status(200).send(product)
}

// delete Product

const deleteProduct = async (req, res) => {
    let id = req.params.id
    await Product.destroy({
        where : {
            id : id
        }
    })
    res.status(200).send("Product Deleted!")
}

// get published product

const getPublishedProduct = async (req, res) => {
    const products = await Product.findAll({
        where : {
            published : true
        }
    })
    res.status(200).send(products)
}

// connect product and reviews

const getProductReviews = async (req, res) => {

    const id = req.params.id

    const data = await Product.findAll({
        include : [{
            model : Review,
            as : 'review'
        }],
        where : { id : id }
    })
    res.status(200).send(data)

}


module.exports = {
    addProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    getPublishedProduct,
    getProductReviews
}