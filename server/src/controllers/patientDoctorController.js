const PatientDoctorAccessModel = require('../models/PatientDoctorAccessModel');
const UserModel = require('../models/UserModel');

const createPatientDoctorAccessRequest = async (req, res) => {
  const patientEmail = req.user.email;
  const doctorId = req.body.id;
  try {
    const patientId = await UserModel.findUserIdByEmail(patientEmail);
    await PatientDoctorAccessModel.createPatientDoctorAccessRequest({ patientId, doctorId });
    res.json({ ok: 'ok' })
  }
  catch ({ message }) {
    res.status(401).json({ message })
  }
}

const deletePatientDoctorAccessRequest = async (req, res) => {
  const patientEmail = req.user.email;
  const doctorId = req.body.id;
  try {
    const patientId = await UserModel.findUserIdByEmail(patientEmail);
    await PatientDoctorAccessModel.deletePatientDoctorAccessRequest({ patientId, doctorId });
    res.json({ ok: 'ok' })
  }
  catch ({ message }) {
    res.status(401).json({ message })
  }
}

const deletePatientRequest = async (req, res) => {
  const doctorEmail = req.user.email;
  const patientId = req.body.id;
  try {
    const doctorId = await UserModel.findUserIdByEmail(doctorEmail);
    await PatientDoctorAccessModel.deletePatientRequest({ doctorId, patientId });
    res.json({ ok: 'ok' })
  }
  catch ({ message }) {
    res.status(401).json({ message })
  }
}

const grantPatientDoctorAccess = async (req, res) => {
  const doctorEmail = req.user.email;
  const patientId = req.body.id;
  try {
    const doctorId = await UserModel.findUserIdByEmail(doctorEmail);
    await PatientDoctorAccessModel.grantPatientDoctorAccess({ doctorId, patientId });
    res.json({ ok: 'ok' })
  }
  catch ({ message }) {
    res.status(401).json({ message })
  }
}

module.exports = {
  createPatientDoctorAccessRequest,
  deletePatientDoctorAccessRequest,
  deletePatientRequest,
  grantPatientDoctorAccess
}