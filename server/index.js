var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var debug = require('debug')('server');
var cors = require('cors');
var mongoose = require('mongoose');
var chalk = require('chalk');
var server = express();
var port = process.env.PORT || 2130;
server.use(morgan('dev'));
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.listen(port, function () {
    debug("Server listening on port " + chalk.blueBright(port) + "...");
});
