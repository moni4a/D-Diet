const { yyyymmdd, dateString2hhmm } = require('../utils/datetime');
const ReportModel = require('../models/ReportModel');

const generateReport = async (req, res) => {
    try {
        const report = await ReportModel.generateReport({
            email: req.user.email,
            dateFrom: req.query.from,
            dateTo: req.query.to,
        });
        const daysReport = report
            .map(({ created_at, ...other }) => {
                const date = yyyymmdd(created_at);
                const time = dateString2hhmm(created_at);
                return {
                    ...other,
                    time,
                    date
                }
            }).reduce((result, { date, ...rowData }) => {
                if (!result[date])
                    result[date] = [];
                result[date].push(rowData);
                return result;
            }, {});
        let dataStr = '';
        for (const day in daysReport) {
            const columnNames = Object.keys(daysReport[day][0]).reverse();
            dataStr += day + ';' + columnNames.join(';') + '\n';
            daysReport[day].forEach(dayRecord => {
                const rowData = Object.values(dayRecord).reverse();
                dataStr += ';' + rowData.join(';') + '\n';
            });
            dataStr += '\n';
        }
        res.status(200).json({
            filename: `Ataskaita_${req.user.email}_${yyyymmdd(new Date(req.query.from * 1000))}_${yyyymmdd(new Date(req.query.to * 1000))}.csv`,
            content: dataStr
        })

    } catch ({ message }) {
        res.status(400).json({ message })
    }
}

const generatePatientsReport = async (req, res) => {
    try {
        const report = await ReportModel.generateReport({
            email: req.query.email,
            dateFrom: req.query.from,
            dateTo: req.query.to,
        });
        const daysReport = report
            .map(({ created_at, ...other }) => {
                const date = yyyymmdd(created_at);
                const time = dateString2hhmm(created_at);
                return {
                    ...other,
                    time,
                    date
                }
            }).reduce((result, { date, ...rowData }) => {
                if (!result[date])
                    result[date] = [];
                result[date].push(rowData);
                return result;
            }, {});
        let dataStr = '';
        for (const day in daysReport) {
            const columnNames = Object.keys(daysReport[day][0]).reverse();
            dataStr += day + ';' + columnNames.join(';') + '\n';
            daysReport[day].forEach(dayRecord => {
                const rowData = Object.values(dayRecord).reverse();
                dataStr += ';' + rowData.join(';') + '\n';
            });
            dataStr += '\n';
        }
        res.status(200).json({
            filename: `Ataskaita_${req.query.email}_${yyyymmdd(new Date(req.query.from * 1000))}_${yyyymmdd(new Date(req.query.to * 1000))}.csv`,
            content: dataStr
        })

    } catch ({ message }) {
        res.status(400).json({ message })
    }
}

module.exports = {
    generateReport,
    generatePatientsReport
}