const db = require('../../database/index');
const bcrypt = require('bcrypt');
const { hashPassword } = require('../utils/hash');

const createPatient = async ({ name, surname, email, password, birth_date, sex, height, weight,
  glycemia_min, glycemia_max, diabetes_type, medication, calories }) => {
  try {
    const [result] = await db.promise().execute(
      `INSERT INTO user (name, surname, email, password, role) VALUES
       ( ? , ? , ? , ? , 'PATIENT');`,
      [name, surname, email, hashPassword(password)]
    );
    const userId = result.insertId;

    await db.promise().execute(
      `INSERT INTO user_info (birth_date, sex, height, weight, glycemia_min, glycemia_max, diabetes_type, medication, calories, fk_USERid) VALUES
       ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? );`,
      [birth_date, sex, height, weight, glycemia_min, glycemia_max, diabetes_type, medication, calories, userId]
    );
    return true;
  }
  catch (err) { throw err; }
}

const createDoctor = async ({ name, surname, email, password }) => {
  try {
    await db.promise().execute(
      `INSERT INTO user (name, surname, email, password, role) VALUES
       ( ? , ? , ? , ? , 'DOCTOR' );`,
      [name, surname, email, hashPassword(password)]
    );
    return true;
  }
  catch (err) { throw err; }
}

const validateCrudentials = async ({ email = '', password = '' }) => {
  try {
    const [users] = await db.promise().execute(
      `SELECT role, password 
      FROM \`user\`
      WHERE \`email\`= ?;`,
      [email]
    );
    if (users.length === 0) throw new Error('Vartotojas su tokiu paštu nerastas');
    const { role, password: passwordHash } = users[0];
    console.log(password);
    console.log(passwordHash);
    const passwordMatch = await bcrypt.compare(password, passwordHash);
    if (!passwordMatch) throw new Error('Slaptažodis neteisingas.');
    return role;
  }
  catch (err) { throw err; }
}

const validateUser = async ({ role, ...data }) => {
  try {
    const [duplicateUsers] = await db.promise().execute(
      `SELECT 1 
       FROM \`user\`
       WHERE \`email\`= ?;`,
      [data.email]
    );
    if (duplicateUsers.length > 0) throw new Error('Email already exists');
    if (role === 'DOCTOR') return await createDoctor(data);
    if (role === 'PATIENT') return await createPatient(data);
    throw new Error('Error')
  }
  catch (err) { throw err; }
}

const findUserIdByEmail = async (email) => {
  try {
    const [userRow] = await db.promise().execute(
      `SELECT id FROM user WHERE email = ?`,
      [email]
    );
    return userRow[0].id;
  }
  catch (err) { throw err; }
}
const getSex = async (id) => {
  try {
    const [userRow] = await db.promise().execute(
      `SELECT sex 
      FROM user u
      join user_info ui
      on ui.fk_USERid =  u.id
       WHERE id = ? `,
      [id]
    );
    return userRow[0].sex;
  }
  catch (err) { throw err; }
}

module.exports = {
  getSex,
  validateUser,
  validateCrudentials,
  findUserIdByEmail
}