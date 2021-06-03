const { Router } = require('express');
const {
    getTodayGlycemia,
    addGlycemiaResult
} = require('../../controllers/glycemiaReportController');
const { authenticateByToken } = require('../../middlewares/auth');

const router = Router();

router.get('/today', authenticateByToken, getTodayGlycemia);
router.post('/addGlycemiaResult', authenticateByToken, addGlycemiaResult);

module.exports = router;