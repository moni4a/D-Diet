const db = require('../../database/index');

/**
 * Ši funkcija skirta tik paciento rolei, kad jis galėtų sugeneruoti ataskaitą
 * 
 * @return {Promise} 
 */
const generateReport = async ({ email, dateFrom, dateTo }) => {

    try {
        const [generatedReport] = await db.promise().execute(
            `SELECT kcal, fats, proteins, carbs, NULL AS glycemia, mrn.created_at
            FROM 
                (SELECT 
                   mrn.*, 
                   mr.fk_USERid as user_id, 
                   mr.created_at
                  FROM 
                      (SELECT 
                        pr.fk_MEAL_REPORT as meal_report_id,
                        SUM(pr.amount * p.kcal/100) as kcal,
                        SUM(pr.amount * p.fat/100) as fats,
                        SUM(pr.amount * p.proteins/100) as proteins,
                        SUM(pr.amount * p.carb/100) as carbs
                        FROM product_report AS pr 
                    LEFT JOIN product AS p
                    ON p.id = pr.fk_PRODUCTid
                    GROUP BY meal_report_id ) as mrn 
                  LEFT JOIN  meal_report as mr
                  ON mrn.meal_report_id = mr.id_MEAL_REPORT) as mrn
       LEFT JOIN user as u
              ON mrn.user_id = u.id
           WHERE u.email = ?
           
           UNION
           
          SELECT NULL AS kcal, NULL AS fats, NULL AS proteins, NULL AS carbs, count as glycemia, gr.created_at
            FROM glycemia_report as gr
       LEFT JOIN user as u
              ON u.id = gr.fk_USERid
           WHERE created_at BETWEEN FROM_UNIXTIME( ? ) AND FROM_UNIXTIME( ? )
        ORDER BY created_at`,
            [email, dateFrom, dateTo]
        );
        return generatedReport;
    } catch (error) { throw error }
}

module.exports = {
    generateReport
}