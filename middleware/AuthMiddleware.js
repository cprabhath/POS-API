// Purpose: Auth middleware to verify token

//------------------Importing Packages----------------//
const jwt = require("jsonwebtoken");
//----------------------------------------------------//

//------------------Secret Key--------------------//
const secretKey = process.env.SECRET_KEY;
//------------------------------------------------//

//------------------Auth Middleware----------------//
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(403).json({
      message: "token is missing",
    });
  } else {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        res.status(401).json({
          message: err.message,
        });
      } else {
        next();
      }
    });
  }
};
//------------------------------------------------//

//------------------Export module----------------//
module.exports = verifyToken;
//------------------------------------------------//
