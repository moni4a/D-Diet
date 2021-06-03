const db = require('../../database/index');

const addProductReports = async (products, mealReportId) => {
    try {
        const formatedProducts = products.map(({ id, amount }) => [amount, id, mealReportId]);
        await db.promise().query(
            `INSERT INTO product_report (amount, fk_PRODUCTid, fk_MEAL_REPORT) VALUES ? ;`,
            [formatedProducts]
        );
        return true;
    } catch (error) { throw error }
}

const getProductsByMRs = async (mealReportIds) => {
    try {
        const mealReportIdsStr = mealReportIds.join(', ');
        const [productRows] = await db.promise().query(
            `SELECT SUM(amount) as amount, fk_PRODUCTid as id
                FROM product_report 
                    WHERE fk_MEAL_REPORT in (${mealReportIdsStr}) 
                    AND DATE(created_at) = CURDATE()
                GROUP BY id;`
        );
        return productRows;
    } catch (error) { throw error }
}

module.exports = {
    addProductReports,
    getProductsByMRs
}