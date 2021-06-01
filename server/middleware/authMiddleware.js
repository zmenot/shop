const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Auth error 1' });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    console.log(`decoded : ${decoded}`);
    next();
  } catch (e) {
    console.log(e.message);
    return res.status(401).json({ message: 'Auth error 2' });
  }
};

module.exports = { authMiddleware };
