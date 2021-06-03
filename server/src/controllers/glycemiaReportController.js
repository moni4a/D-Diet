const GlycemiaReportModel = require('../models/GlycemiaReportModel');
const { findUserIdByEmail } = require('../models/UserModel');

const getTodayGlycemia = async (req, res) => {
    try {
        const userId = await findUserIdByEmail(req.user.email);
        const glycemiaRecords = await GlycemiaReportModel.getGlycemiaCurrentDate(userId);
        res.status(200).json({ glycemiaRecords });
    } catch ({ message }) {
        res.status(400).json({ message })
    }
}

const addGlycemiaResult = async (req, res) => {
    try {
        const { email, amount } = req.body;
        const userId = await findUserIdByEmail(email);
        await GlycemiaReportModel.addGlycemiaResult({ userId, amount });
        res.status(200).json({ message: 'O.K.' });
    } catch ({ message }) {
        res.status(400).json({ message })
    }
}

module.exports = {
    getTodayGlycemia,
    addGlycemiaResult
}