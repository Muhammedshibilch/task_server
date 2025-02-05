const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
  console.log("Inside jwtMiddleware");

  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(404).json("Authorization failed.... Token is Missing!!!");
  }

  const token = authHeader.split(" ")[1];
  console.log('Token from header:', token);

  if (token) {
    try {
      const jwtResponse = jwt.verify(token, process.env.JWTPASSWORD);
      console.log('JWT Response:', jwtResponse);
      req.userId = jwtResponse.userId;
      next();
    } catch (err) {
      res.status(401).json("Authorization failed.... Please Login");
    }
  } else {
    res.status(404).json("Authorization failed.... Token is Missing!!!");
  }
};

module.exports = jwtMiddleware;
