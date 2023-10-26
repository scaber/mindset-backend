const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const checkAuth = (req, res, next) => {
  var token = req.headers["authorization"];
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  jwt.verify(token.split(" ")[1], config.jwtSecret, (err, decoded) => {
    if (err)
      return res
        .status(401)
        .send({ auth: false, message: "Failed to authenticate token." });

    req.user = {
      login: decoded.login,
      id: decoded.id,
    };
    next();
  });
};

module.exports = {
  checkAuth,
};
