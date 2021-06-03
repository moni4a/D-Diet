const db = require('../../database/index');

/**
 * Ši funkcija skirta tik paciento rolei, kad jis galėtų susirasti norimą produktą
 * @return {Promise} 
 */
const getProducts = async () => {
    try {
        const [products] = await db.promise().execute(
            `SELECT * FROM product`,
        );
        return products;
    } catch (error) { throw error }
}

const getProductByIds = async (productIds) => {
    try {
        const productIdsStr = productIds.join(', ');
        const [products] = await db.promise().execute(
            `SELECT id, kcal, fat, carb, proteins 
               FROM product
              WHERE id in (${productIdsStr});`
        )
        return products;
    } catch (error) { throw error }
}

module.exports = {
    getProducts,
    getProductByIds
}