const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'config/.env' });

const authenticateByToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) return res.status(401).json({ message: 'Please register to view this page' });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Access denied' });
    req.user = user;
    next();
  });
}

module.exports = {
  authenticateByToken
}