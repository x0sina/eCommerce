const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    description: Array,
    price: String,
    offPrice: String,
    discount: String,
    imageSrc: String,
    color: String,
    inStock: Boolean
})

const Product = mongoose.model("Product", productSchema)

exports.Product = Product;