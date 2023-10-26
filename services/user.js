const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const addUser = (user) => fetch(`${config.api}/users/add`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password
  })
})
  .then(res => {

    return res.json()
  });


const getUser = (id) => fetch(`${config.api}/users/${id}`)
  .then(res => { return res.json() })

const getUsers = (searchText = "") => fetch(`${config.api}/users/search?q=${searchText}`)
  .then(res => { return res.json() })
const getAllUsers = () => fetch(`${config.api}/users`)
  .then(res => { return res.json() })
module.exports = {
  addUser,
  getUsers,
  getUser,
  getAllUsers
};
