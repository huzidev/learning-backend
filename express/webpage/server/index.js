const db = require('./db');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path : './config.env' });// for path where we've config.env
require('./db/connection'); 
const cookie = require("cookie-parser");
const cors = require("cors");


const server = express(); // will create express application OR starts ours server
const port = 8000;


// MIDDLEWARE
server.use(express.json()); // al the data came in the form of JSON and app didn't recognize until we defined it with middleware
server.use(require('./router/auth')); //(.use) is used to set up middleware for your application
// setting engine for pug
server.set('view engine', 'pug');
server.set('views', './views');

// Body-Parser for form management
const bodyParser = require('body-parser');
const Verification = require('./middleware/Verification');
server.use(bodyParser.urlencoded({ extended : true }));
server.use(cookie());
server.use(bodyParser.json());

// starting of server
server.get('/', (req, res) => {
    res.send({ message: 'hello world Index.js' });
});

server.get('/products', (req, res) => {
    res.send({ list: db.getProducts() });
});

server.get('/data', (req, res) => {
    res.send({ userData : data.data() });
});

server.get('/product/:productId', (req, res) => {
    const { productId } = req.params;
    console.log(productId, "is the product's Id");
    const product = db.getProducts().find(((product) => product.id === parseInt(productId) ));
    // necessary to use parseINT to convert stringify int to simple int
    if (!product) {
        res.status(404).send({ message: 'product not found'});
        return;
    }
    res.send({ product });
});

server.get('/products/search', (req, res) => {// ? means start of query string (means) specific item's info
    const { name } = req.query;//we uses (req) when we wanted to read data which came to server 
    console.log(name, 'name');
    const products = db.getProducts().filter(((product) => product.name.includes(name)));
    // we've haven't used find here because we don't want ID rather we want name(info)
    if (!products.length) {
        res.status(404).send({ message: `No product found with name ${name}`});
        return;
    }
    res.send({ products });
});

//Registration page
// server.get('/register', (req, res) => {
//     res.render('register');
// });

// server.get('/login', (req, res) => {
//     res.render('login');
// });

// server.get('/contact', (req, res) => {
//     res.render('contactUs');
// });

// server.get('/about', (req, res) => {
//     res.render('about');
// });

server.get("/about", Verification, (req, res) => {// verification is MIDDLEWARE will open about page only if user have its jwtoken
    console.log("About us page");
    res.send(req.userInfo); // userInfo have all the data of user because we've defined it already in middleware
})

server.post('/secret', (req, res) => {
    res.render('secret', {
        data : req.body
    });
});

// if we uses submit="GET"
server.get('/form', (req, res) => {
    const temp = JSON.parse(JSON.stringify(req.query));
    res.render('form', {
        "data" : temp
    });
});

// if we uses submit="POST"
// make sure to put urlencoded as TRUE at above
server.post('/form', (req, res) => {
    console.log(req.body);
    res.render('form', {
        data : req.body
    });
});


server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});