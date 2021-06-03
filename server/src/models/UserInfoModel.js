const db = require('../../database/index');
/**
 * Ši funkcija skirta tik paciento rolei, kad galėtų matyti savo profilio duomenis 
 * 
 * @return {Promise} 
 */
const getUserInfo = async (userId) => {
    try {
        const [userInfo] = await db.promise().execute(
            `SELECT *
                FROM user
                WHERE id = ?`,
            [userId]
        );
        return userInfo;
    } catch (error) { throw error }
}

const getDoctorsInfo = async (search, patientId) => {
    try {
        if (!!search) {
            console.log(search, patientId)
            const likeSearch = `%${search}%`;
            const [doctorsInfo] = await db.promise().execute(
                `SELECT * 
                from 
                    (select id, email, name, surname 
                    from user
                    where role = "DOCTOR") as d
                LEFT JOIN 
                    (select access_granted, doctorId
                    from user
                    JOIN patient_doctor_access
                    on user.id = patient_doctor_access.patientId
                    where user.id = ? ) as pa
                on d.id = pa.doctorId
                where name LIKE ?  OR surname LIKE ? `,
                [patientId, likeSearch, likeSearch]
            );
            return doctorsInfo;
        } else {
            const [doctorsInfo] = await db.promise().execute(
                `SELECT * 
                from 
                    (select id, email, name, surname 
                    from user
                    where role = "DOCTOR") as d
                LEFT JOIN 
                    (select access_granted, doctorId
                    from user
                    JOIN patient_doctor_access
                    on user.id = patient_doctor_access.patientId
                    where user.id = ? ) as pa
                on d.id = pa.doctorId`,
                [patientId]
            );
            return doctorsInfo;
        }
    } catch (error) { throw error }
}

const getMyDoctorsInfo = async (patientId) => {
    try {
        const [myDoctorsInfo] = await db.promise().execute(
            `SELECT id, email, name, surname FROM user d
                LEFT JOIN patient_doctor_access a 
                ON a.doctorId = d.id 
                AND a.patientId = ?
                WHERE D.role = "DOCTOR"
                AND access_granted = 1;`,
            [patientId]
        );
        return myDoctorsInfo;
    } catch (error) { throw error }
}

const getPatientsRequests = async (doctorId) => {
    try {
        const [patientsInfo] = await db.promise().execute(
            `SELECT * FROM user p
                LEFT JOIN patient_doctor_access a 
                   ON a.patientId = p.id 
                   AND a.doctorId = ?
                WHERE p.role = "PATIENT"
                   AND access_granted = 0`,
            [doctorId]
        );
        return patientsInfo;
    } catch (error) { throw error }
}

const getPatients = async (search, doctorId) => {
    try {
        if (!!search) {
            const likeSearch = `%${search}%`;
            const [patientsInfo] = await db.promise().execute(
                `SELECT * FROM user p
                LEFT JOIN patient_doctor_access a 
                   ON a.patientId = p.id 
                   AND a.doctorId = ?
                   Where access_granted = 1 AND
                name LIKE ?  OR surname LIKE ? `,
                [doctorId, likeSearch, likeSearch]
            );
            return patientsInfo;
        } else {
            const [patientsInfo] = await db.promise().execute(
                `SELECT * FROM user p
                   LEFT JOIN patient_doctor_access a 
                   ON a.patientId = p.id 
                   AND a.doctorId = ?
                   WHERE access_granted = 1`,
                [doctorId]
            );
            return patientsInfo;
        }
    } catch (error) { throw error }
}

/**
 * Ši funkcija skirta tik gydytojo rolei, kad galėtų matyti paciento profilio duomenis, 
 * kurie jam suteikė tokią prieigą
 * 
 * @return {Promise} 
 */
const getMyPatientInfo = async ({ patientId, doctorId }) => {
    try {
        const [user_info] = await db.promise().execute(
            `SELECT *
                FROM user_info
                INNER JOIN user ON user.id = user_info.fk_USERid AND user.id = ?
                INNER JOIN patient_doctor_access 
                    ON user.id = patientId 
                    AND doctorId = ? 
                    AND access_granted = 1`
            [patientId, doctorId]
        );
        return user_info;
    } catch (error) { throw error }
}

/**
 * Ši funkcija skirta tik paciento rolei, kad galėtų matyti savo registracijos ir profilio duomenis 
 * 
 * @return {Promise} 
 */
const getAllInfo = async (userId) => {
    try {
        const [userProfileInfo] = await db.promise().execute(
            `SELECT user.*, user_info.*
                FROM user, user_info
                WHERE user.id = user_info.fk_USERid
                AND user.id = ?`,
            [userId]
        );
        return userProfileInfo;
    } catch (error) { throw error }
}

/**
 * Ši funkcija skirta tik paciento rolei, kad jis galėtų redaguoti savo profilio duomenis
 * 
 * @return {Promise} 
 */
const updateUserInfo = async ({
    id, name, surname, email,
    birth_date, height, weight, glycemia_min, glycemia_max, sex, diabetes_type, medication, calories
}) => {
    try {
        await db.promise().execute(
            `UPDATE user_info
                SET birth_date = ? , 
                height = ? , 
                weight = ? , 
                glycemia_min = ? , 
                glycemia_max = ? , 
                sex = ? , 
                diabetes_type = ? , 
                medication = ? ,
                calories = ? 
                WHERE \`fk_USERid\` = ? `,
            [birth_date, height, weight, glycemia_min, glycemia_max, sex, diabetes_type, medication, calories, id]
        );

        // const id = result.insertId;

        await db.promise().execute(
            `UPDATE user 
                SET name = ? , 
                    surname = ? , 
                    email = ? 
                WHERE id = ? `,
            [name, surname, email, id]
        );
        // return true;
        return id;
    } catch (error) { throw error }
}

module.exports = {
    getUserInfo,
    getAllInfo,
    getMyPatientInfo,
    getPatients,
    getDoctorsInfo,
    getMyDoctorsInfo,
    getPatientsRequests,
    updateUserInfo
}