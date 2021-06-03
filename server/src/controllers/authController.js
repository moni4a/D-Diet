const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const expiresIn = 1000 * 60 * 60 * 24;
const generateToken = (email, role) => jwt.sign(
  { email, role },
  process.env.TOKEN_SECRET,
  { expiresIn }
);

const login = async (req, res) => {
  const { email } = req.body
  try {
    const role = await UserModel.validateCrudentials(req.body);
    console.log(email);
    const token = generateToken(email, role);
    res.status(200).json({ email, token, role })
  }
  catch ({ message }) {
    res.status(401).json({ message })
  }
}

const registerPatient = async (req, res) => {
  try {
    const role = 'PATIENT';
    await UserModel.validateUser({ ...req.body, role });
    const { email } = req.body;
    const token = generateToken(email, role);
    res.status(200).json({ token, role, email })
  } catch ({ message }) {
    console.log('ERROR:', message)
    res.status(400).json({ message });
  }
}

const registerDoctor = async (req, res) => {
  try {
    const role = 'DOCTOR';
    await UserModel.validateUser({ ...req.body, role });
    const { email } = req.body;
    const token = generateToken(email, role);
    res.status(200).json({ token, role, email })
  } catch ({ message }) {
    console.log('ERROR:', message)
    res.status(400).json({ message });
  }
}

const logout = async (req, res) => {
  res.status(200).json({ message: 'O.K.' });
}

module.exports = {
  login,
  registerPatient,
  registerDoctor,
  logout
}
