const express = require('express');
const router = express.Router();
const { Product } = require('../models/products')

router.get('/', async (req, res) => {
    const products = await Product.find()
    return res.send(products)
})

module.exports = router;