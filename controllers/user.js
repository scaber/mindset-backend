const userService = require("../services/user");

function getUsers(req, res) {
  let searchText = req.query.searchText;
  if (searchText == "") {
    return userService.getAllUsers().then((data) => res.send(data));

  }
  else {
    return userService.getUsers(searchText).then((data) => res.send(data));
  }
}

function getUser(req, res) {
  let id = req.query.id;
  return userService.getUser(id).then((data) => res.send(data));
}
module.exports = {
  getUsers,
  getUser,
};
