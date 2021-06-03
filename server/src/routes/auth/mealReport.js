const { Router } = require('express');
const {
    getTodayMealReport,
    addMeal
} = require('../../controllers/mealReportController');
const { authenticateByToken } = require('../../middlewares/auth');

const router = Router();

router.get('/today', authenticateByToken, getTodayMealReport);
router.post('/addMeal', addMeal);

module.exports = router;