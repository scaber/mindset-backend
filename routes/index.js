const authController = require("../controllers/auth");
const userController = require("../controllers/user");

const {ipMiddleware} = require("../middlewares/ip");
 
module.exports.set = (app) => {
  app.post("/auth/login",ipMiddleware, authController.login);
  app.post("/auth/register",ipMiddleware, authController.register);
  app.get("/users",ipMiddleware, userController.getUsers);
   app.get("/getUser",ipMiddleware,  userController.getUser);
 
  //next endpoints require auth
};
