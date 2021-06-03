const db = require('../../database/index');

/**
 * Ši funkcija skirta tik paciento rolei, kad jis galėtų matyti einamos dienos įrašus
 * 
 * @return {Promise} 
 */
const getMealReportCurrentDate = async (userId) => {
    try {
        const [meal_reports] = await db.promise().execute(
            `SELECT id_MEAL_REPORT as id FROM meal_report WHERE meal_report.fk_USERid = ? 
             AND date(meal_report.created_at) = CURDATE()`,
            [userId]
        );
        return meal_reports.map(({id}) => id);
    } catch (error) { throw error }
}

/**
 * Ši funkcija skirta tik paciento rolei, kad jis galėtų pridėti naują valgį
 * 
 * @return {Promise} 
 */
const addMeal = async ({ type, userId }) => {
    try {
        const [result] = await db.promise().execute(
            `INSERT INTO meal_report (fk_USERid, type)
                VALUES ( ? , ? )`,
            [userId, type]
        );
        return result.insertId;
    } catch (error) { throw error }
}

module.exports = {
    getMealReportCurrentDate,
    addMeal
}