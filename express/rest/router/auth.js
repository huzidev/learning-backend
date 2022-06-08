const express = require('express');
const router = express.Router();
// since we are not in app.js the main file, therefore we've to use (router) instead of (server)

router.get('/', (req, res) => {
    res.send({ message: 'hello world Router.js' });
});

// when we wanted to GET user data we uses POST because GET just brings data and POST Reads it or collect it so we can read it
router.post('/register', (req, res) => {
    console.log(req.body);
    res.json( { message : req.body } ); // because data is going to be in JSON format and we've to stringify it
});

module.exports = router;