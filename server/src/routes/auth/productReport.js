const { Router } = require('express');
const {
    addProduct
} = require('../../controllers/productReportController');
const { authenticateByToken } = require('../../middlewares/auth');

const router = Router();

router.post('/addProduct', authenticateByToken, addProduct);

module.exports = router;