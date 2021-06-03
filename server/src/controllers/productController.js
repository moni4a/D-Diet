const ProductModel = require('../models/ProductModel');

const getProducts = async (req, res) => {
    try {
        const products = await ProductModel.getProducts();
        res.status(200).json({ products })
    }
    catch ({ message }) {
        res.status(401).json({ message })
    }
}

module.exports = {
    getProducts
}