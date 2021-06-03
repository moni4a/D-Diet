const bcrypt = require('bcrypt');

const saltRounds = 5;
const salt = bcrypt.genSaltSync(saltRounds);

const hashPassword = (password) => bcrypt.hashSync(password, salt)

module.exports = {
  hashPassword
}