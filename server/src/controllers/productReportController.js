const ProductReportModel = require('../models/ProductReportModel');

const addProduct = async (req, res) => {
  res.json(req.user)
}

module.exports = {
  addProduct
}