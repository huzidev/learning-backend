// FOR MYSQL
import db from '../models/index.js';
import multer from 'multer';
import path from 'path';

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
    await Product.destroy({
        where : {
            pid : id
        }
    })
    res.status(200).send("Product Deleted!")
}

// GET PRODUCT REVIEWS
const getProductReviews = async (req, res) => {
    let id = req.params.id
    const data = await Product.findAll({ // since we're GETTING the data therefore we've to use object ({})
        include : [{
            model : Review,
            as : 'review'
        }],
        where : {
            pid : id
        }
    })
    res.status(200).send(data[0])
}

// storage path for files(images)
const storage = multer.diskStorage({
    destination : (req, file, cb) => { // file is the path from where img is coming and cb is call back function IMP to use 
        cb(null, 'images') // null means no error in call back function AND we can use ../Images if folder is one level Above
        // or use just Folder Name if they are same siblings like in this case in Images all uploaded images are going to be stored
    },
    filename : (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)) // path.extname is EXTENSION NAME
    }
})

// specification for file(images)
const upload = multer({
    storage : storage, // the storage at right is the function we've defined above
    limits : { fileSize : '2000000' }, // the size is in bytes means this means just 2 mb
    fileFilter : (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/ // make sure to write file types INSIDE double /here/
        const mimeType = fileTypes.test(file.mimetype) // it will test the file uploaded and run it with fileTypes which we've already created
        const extname = fileTypes.test(path.extname(file.originalname)) // works same as of mimetype

        if (mimeType && extname) {
            return cb(null, true)
        }
        else{
            cb('use images with proper file format')
        }
    }
}).single('image') 

module.exports = {
    addProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    getProductReviews,
    upload
}