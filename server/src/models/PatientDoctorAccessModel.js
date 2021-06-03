const { commit } = require('../../database/index');
const db = require('../../database/index');

/**
 * Ši funkcija skirta tik paciento rolei, prašyti daktaro, jog jis galėtų peržiūrėti duomenis
 * 
 * @return {Promise} 
 */
const createPatientDoctorAccessRequest = async ({ patientId, doctorId }) => {
  try {
    await db.promise().execute(
      `INSERT INTO patient_doctor_access (patientId, doctorId) VALUES
       ( ? , ? );`,
      [patientId, doctorId]
    );
    return true;
  } catch (error) { throw error }
}

/**
 * Ši funkcija skirta tiek daktaro tiek paciento rolei, atšaukti prašymą
 * 
 * @return {Promise} 
 */
const deletePatientDoctorAccessRequest = async ({ patientId, doctorId }) => {
  try {
    await db.promise().execute(
      `DELETE FROM  patient_doctor_access 
      WHERE patientId = ? AND doctorId = ? ;`,
      [patientId, doctorId]
    );
    return true;
  } catch (error) { throw error }
}

const deletePatientRequest = async ({ doctorId, patientId }) => {
  try {
    await db.promise().execute(
      `DELETE FROM  patient_doctor_access 
      WHERE doctorId = ? AND patientId = ? ;`,
      [doctorId, patientId]
    );
    return true;
  } catch (error) { throw error }
}

/**
 * Ši funkcija skirta tik daktaro rolei, patvirtinti prašymą, jog jis galėtų peržiūrėti duomenis
 * 
 * @return {Promise} 
 */
const grantPatientDoctorAccess = async ({ doctorId, patientId }) => {
  try {
    await db.promise().execute(
      `UPDATE patient_doctor_access 
        SET
        access_granted = 1
      WHERE doctorId = ? AND patientId = ? ;`,
      [doctorId, patientId]
    );
    return true;
  } catch (error) { throw error }
}

module.exports = {
  createPatientDoctorAccessRequest,
  deletePatientDoctorAccessRequest,
  deletePatientRequest,
  grantPatientDoctorAccess,
}
