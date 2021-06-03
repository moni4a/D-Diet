const UserInfoModel = require('../models/UserInfoModel');
const { findUserIdByEmail } = require('../models/UserModel');

const getUserInfo = async (req, res) => {
    try {
        const userId = await findUserIdByEmail(req.user.email);
        const userInfo = await UserInfoModel.getUserInfo(userId);
        res.status(200).json({ userInfo });
    } catch ({ message }) {
        res.status(400).json({ message })
    }
}

const getAllInfo = async (req, res) => {
    try {
        const userId = await findUserIdByEmail(req.user.email);
        const [userProfileInfo] = await UserInfoModel.getAllInfo(userId);
        res.status(200).json({ userProfileInfo });
    } catch ({ message }) {
        res.status(400).json({ message })
    }
}

const getDoctorsInfo = async (req, res) => {
    const search = req.query.search;
    const patientEmail = req.user.email;
    try {
        const patientId = await findUserIdByEmail(patientEmail);
        const doctorsInfo = await UserInfoModel.getDoctorsInfo(search, patientId);
        res.status(200).json({ doctorsInfo });
    } catch ({ message }) {
        res.status(400).json({ message })
    }
}

const getMyDoctorsInfo = async (req, res) => {
    const patientEmail = req.user.email;
    try {
        const patientId = await findUserIdByEmail(patientEmail);
        const myDoctorsInfo = await UserInfoModel.getMyDoctorsInfo(patientId);
        console.log(myDoctorsInfo);
        res.status(200).json({ myDoctorsInfo });
    } catch ({ message }) {
        res.status(400).json({ message })
    }
}

const getPatientsRequests = async (req, res) => {
    const doctorEmail = req.user.email;
    try {
        const doctorId = await findUserIdByEmail(doctorEmail);
        const patientsInfo = await UserInfoModel.getPatientsRequests(doctorId);
        res.status(200).json({ patientsInfo });
    } catch ({ message }) {
        res.status(400).json({ message })
    }
}

const getPatients = async (req, res) => {
    const search = req.query.search;
    const doctorEmail = req.user.email;
    try {
        const doctorId = await findUserIdByEmail(doctorEmail);
        const patientsInfo = await UserInfoModel.getPatients(search, doctorId);
        res.status(200).json({ patientsInfo });
    } catch ({ message }) {
        res.status(400).json({ message })
    }
}

const getPatientInfo = async (req, res) => {
    const userId = req.params.id;
    try {
        const [userProfileInfo] = await UserInfoModel.getAllInfo(userId);
        res.status(200).json({ userProfileInfo });
    } catch ({ message }) {
        res.status(400).json({ message })
    }
}

const addUserInfo = async (req, res) => {
    res.json(req.user)
}

const updateUserInfo = async (req, res) => {
    const email = req.user.email;
    const data = req.body;
    try {
        const patientId = await findUserIdByEmail(email);
        console.log(patientId);
        await UserInfoModel.updateUserInfo({ id: patientId, ...data });
        res.status(200).json({ ok: 'ok' })
    } catch ({ message }) {
        console.log('ERROR:', message)
        res.status(400).json({ message });
    }
}

module.exports = {
    getUserInfo,
    getAllInfo,
    getDoctorsInfo,
    getMyDoctorsInfo,
    getPatientInfo,
    getPatientsRequests,
    getPatients,
    addUserInfo,
    updateUserInfo
}