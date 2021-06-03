const { Router } = require('express');
const {
    getProducts
} = require('../../controllers/productController');
const { authenticateByToken } = require('../../middlewares/auth');

const router = Router();

router.get('/',  /*authenticateByToken, */ getProducts);

module.exports = router;