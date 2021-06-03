const { Router } = require('express');
const {
    generateReport,
    generatePatientsReport
} = require('../../controllers/reportController');
const { authenticateByToken } = require('../../middlewares/auth');

const router = Router();

router.get('/generateReport', authenticateByToken, generateReport);
router.get('/generatePatientsReport', authenticateByToken, generatePatientsReport);

module.exports = router;