const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config({ path: 'config/.env' });
const authRouter = require('./routes/auth');
const patientDoctorAccessRouter = require('./routes/auth/patientDoctorAccess');
const userInfoRouter = require('./routes/auth/userInfo');
const glycemiaReportRouter = require('./routes/auth/glycemiaReport');
const reportRouter = require('./routes/auth/report');
const mealReportRouter = require('./routes/auth/mealReport');
const productReportRouter = require('./routes/auth/productReport');
const productRouter = require('./routes/auth/product');

const https = require('https');
const fs = require('fs');

const server = express();
const { PORT, DOMAIN, CERT_PASS } = process.env;

// Middlewares
server.use(express.json());
server.use(express.urlencoded());
server.use(morgan('tiny'));
server.use(cors());
// Routes
server.use('/auth', authRouter);
server.use('/patientDoctorAccess', patientDoctorAccessRouter);
server.use('/userInfo', userInfoRouter);
server.use('/glycemiaReport', glycemiaReportRouter);
server.use('/report', reportRouter);
server.use('/mealReport', mealReportRouter);
server.use('/productReport', productReportRouter);
server.use('/product', productRouter);

server.listen(PORT, () => console.log(`Server is running on https://${DOMAIN}:${PORT}`));

// console.log(require('crypto').randomBytes(64).toString('hex'));