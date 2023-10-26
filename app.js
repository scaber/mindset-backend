const express = require("express"); // import express
var rfs = require("rotating-file-stream"); // version 2.x
var morgan = require("morgan");
var path = require("path");
const router = require("./routes");
var cors = require("cors");
const app = express(); // create a new express app
  
app.use(express.json());

var accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log"),
});
 // setup the logger
app.use(morgan("combined", { stream: accessLogStream }));
app.use(cors());
 
 router.set(app);

app.listen({ port: 3001 }, async () => {
  console.log("server running on http://localhost:3001");
});
