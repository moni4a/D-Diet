const { Router } = require('express');
const { login, registerPatient, registerDoctor, logout } = require('../controllers/authController');
const { authenticateByToken } = require('../middlewares/auth');

const router = Router();

router.post('/login', login);

router.post('/registerPatient', registerPatient);

router.post('/registerDoctor', registerDoctor);

router.post('/logout', authenticateByToken, logout);

module.exports = router;