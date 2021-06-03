const db = require('../../database/index');

/**
 * Ši funkcija skirta tik paciento rolei, kad galėtų matyti savo įvestus glikemijos rezultatus
 * 
 * @return {Promise} 
 */
const getGlycemiaResult = async ({ fk_USERid }) => {
    try {
        const [glycemia_report] = await db.promise().execute(
            `SELECT *
                FROM glycemia_report
                WHERE glycemia_report.fk_USERid = ?`,
            [fk_USERid]
        );
        return glycemia_report;
    } catch (error) { throw error }
}

const getGlycemiaCurrentDate = async (userId) => {
    try {
        const [glycemiaRecords] = await db.promise().execute(
            `SELECT id_GLYCEMIA_REPORT as id, created_at as timestamp, count as amount
               FROM glycemia_report
              WHERE glycemia_report.fk_USERid = ? 
                AND date(created_at) = CURDATE();`,
            [userId]
        );
        return glycemiaRecords;
    } catch (error) { throw error }
}

/**
 * Ši funkcija skirta tik paciento rolei, kad jis galėtų pridėti glikemijos rezultatą
 * 
 * @return {Promise} 
 */
const addGlycemiaResult = async ({ userId, amount }) => {
    try {
        await db.promise().execute(
            `INSERT INTO glycemia_report (fk_USERid, count)
                VALUES ( ? , ? )`,
            [userId, amount]
        );
        return true;
    } catch (error) { throw error }
}

module.exports = {
    getGlycemiaResult,
    getGlycemiaCurrentDate,
    addGlycemiaResult
}