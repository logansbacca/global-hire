
require('dotenv').config();

const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const routes = require('./src/config/routes');
const cors = require('cors');


server.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    methods: 'GET,POST,PUT,DELETE', // Allow the HTTP methods your frontend needs
    credentials: true, // Allow credentials (e.g., cookies, authorization headers)
  }));

// ??
var config = require('./src/config/config')
var database = require("./src/config/db") 
const User = require("./src/user/user.model")
const Worker = require("./src/workers/workers.model")

server.use(bodyParser.json());


//invoking the module.exports function from the routes.js module in your server.js file.
routes(server);

// runs the web server, you listen on a specific port that i put in the env file for added security
const PORT = process.env.PORT
server.listen(PORT, () => {
    console.log("server running on port" + PORT)
})







