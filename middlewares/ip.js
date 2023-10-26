const requestIp = require('request-ip');
const fs = require('fs');
 
const ipMiddleware = function (req, res, next) {
    var clientIp = requestIp.getClientIp(req); // on localhost > 127.0.0.1
    console.log(clientIp); 
    let writer =   fs.createWriteStream('./log/log.txt' ,{flags : 'a'});
    writer.write(clientIp +  '\r\n ');

     next();
};
module.exports = {
    ipMiddleware,
};
