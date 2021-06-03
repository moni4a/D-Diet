const { Router } = require('express');
const {
    getUserInfo,
    getAllInfo,
    getPatientInfo,
    addUserInfo,
    updateUserInfo,
    getDoctorsInfo,
    getPatients,
    getMyDoctorsInfo,
    getPatientsRequests
} = require('../../controllers/userInfoController');
const { authenticateByToken } = require('../../middlewares/auth');

const router = Router();

router.get('/getUserInfo', authenticateByToken, getUserInfo);
router.get('/getAllInfo', authenticateByToken, getAllInfo);
router.get('/getDoctorsInfo', authenticateByToken, getDoctorsInfo);
router.get('/getPatients', authenticateByToken, getPatients);
router.get('/getMyDoctorsInfo', authenticateByToken, getMyDoctorsInfo);
router.get('/getPatientsRequests', authenticateByToken, getPatientsRequests);
router.get('/getPatientInfo/:id', authenticateByToken, getPatientInfo);
router.post('/addUserInfo', authenticateByToken, addUserInfo);
router.patch('/updateUserInfo', authenticateByToken, updateUserInfo);

module.exports = router;