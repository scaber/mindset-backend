const env = process.env.NODE_ENV || "development"; 
const authService = require("../services/auth");
const userService = require("../services/user");

function login(req, res) {
  let success=false;
  return authService
    .authenticate(req.body)
    .then(async data => { 
      if(data.user.message) {
        success=false
      }
      else{
        success=true
      }
      await res.send({
        success: success,
        data: data,
      });
    })
    .catch((err) => {
      if (err.type === "custom") {
        return res.send({
          success: false,
          message: err.message,
        });
      }
      return res.send({
        success: false,
        message: "Authentication failed. Unexpected Error.",
      });
    });
}

function register(req, res) {
  var id = req.body.id;
  return userService.getUser(id || "").then((exists) => {
     
    var user = {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: "users",
    };

    return userService.addUser(user).then(() => res.send({ success: true }));
  });
}

module.exports = {
  login,
  register,
};
