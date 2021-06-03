const { Router } = require('express');
const {
  createPatientDoctorAccessRequest,
  deletePatientDoctorAccessRequest,
  deletePatientRequest,
  grantPatientDoctorAccess,
} = require('../../controllers/patientDoctorController');
const { authenticateByToken } = require('../../middlewares/auth');


const router = Router();

router.post('/create', authenticateByToken, createPatientDoctorAccessRequest);
router.delete('/delete', authenticateByToken, deletePatientDoctorAccessRequest);
router.delete('/deletePatientRequest', authenticateByToken, deletePatientRequest);
router.patch('/authorize', authenticateByToken, grantPatientDoctorAccess);

module.exports = router;