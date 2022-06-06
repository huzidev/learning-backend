const express = require('express');

const db = require('./db');

const server = express(); // will create express application OR starts ours server

server.get('/', (req, res) => {
    res.send({message: 'hello world'})
})

server.get('/products', (req, res) => {
    res.send({ list: db.getProducts() })
})

server.get('/product/:productId', (req, res) => {
    const { productId } = req.params;
    const product = db.getProducts().find(((product) => product.id === parseInt(productId) ));
    if (!product) {
        res.status(404).send({ message: 'product not found'})
        return;
    }
    res.send({ product })
})

server.get('/products/search', (req, res) => { // ? means start of query string (means) specific item's info
    const { name } = req.query;
    console.log(name, 'name');
    const products = db.getProducts().filter(((product) => product.name.includes(name) ))
    if (!products.length) {
        res.status(404).send({ message: `No product found with name ${name}`})
        return;
    }
    res.send({ products })
})

server.listen(8000, () => {
    console.log('server listening on port 8000');
});