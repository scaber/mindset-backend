const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));


 const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const CustomError = require("../CustomError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { response } = require('express');

const authenticate =   async (params) => {
 
  //return fetch(`https://dummyjson.com/users/${params.userId}`)
  return await   fetch(`${config.api}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      
      username: params.username,
      password: params.password,
      // expiresInMins: 60, // optional
    })
  })
  .then(  response => {
    
     return   response.json()  
    })
    .then((user)=>{
      if (!user) throw new CustomError("Authentication failed. User not found.");
      
      return { user };
    }) 
};

module.exports = {
  authenticate,
};
