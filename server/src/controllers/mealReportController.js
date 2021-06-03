const MealReportModel = require('../models/MealReportModel');
const { findUserIdByEmail, getSex } = require('../models/UserModel');
const { addProductReports, getProductsByMRs } = require('../models/ProductReportModel');
const { getProductByIds } = require('../models/ProductModel');

const getTodayMealReport = async (req, res) => {
    const userId = await findUserIdByEmail(req.user.email);
    const mealReportIds = await MealReportModel.getMealReportCurrentDate(userId);
    console.log(mealReportIds);
    if (mealReportIds.length === 0) {
        res.status(200).json({
            kcal: 0,
            fat: 0,
            carb: 0,
            proteins: 0,
        });
        return;
    }
    const products = await getProductsByMRs(mealReportIds);
    const productIds = products.map((p) => p.id);
    const productData = await getProductByIds(productIds);
    const result = productData
        .map(({ id, kcal, fat, carb, proteins }) => ({
            kcal: +kcal,
            fat: +fat,
            carb: +carb,
            proteins: +proteins,
            amount: +products.find((p) => p.id === id).amount
        }))
        .map(({ kcal, fat, carb, proteins, amount }) => ({
            kcal: kcal * amount / 100,
            fat: +fat * amount / 100,
            carb: +carb * amount / 100,
            proteins: +proteins * amount / 100,
        }))
        .reduce((results, { kcal, fat, carb, proteins }) => ({
            kcal: results.kcal + kcal,
            fat: results.fat + fat,
            carb: results.carb + carb,
            proteins: results.proteins + proteins
        }));

    res.status(200).json(result);
}

const addMeal = async (req, res) => {
    try {
        const { email, type, products } = req.body;
        const userId = await findUserIdByEmail(email);
        const mealReportId = await MealReportModel.addMeal({ type, userId });
        await addProductReports(products, mealReportId);
        const productData = await getProductByIds(products.map(({ id }) => id));
        const sex = await getSex(userId);
        const carbs = products.reduce((sum, { id: addedProductId, amount }) => {
            return sum + +amount * +productData.find(({ id }) => id === addedProductId).carb / 100;
        }, 0);
        res.status(200).json({ carbs, sex });
    } catch ({ message }) {
        console.log(message);
        res.status(400).json({ message })
    }
}

module.exports = {
    getTodayMealReport,
    addMeal
}