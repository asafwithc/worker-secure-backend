require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const errorController = require("./src/controllers/errorController");
const { log } = require('console');

var jwtAuth = require("./src/middlewares/jwtAuth");
var db = require("./src/services/database");


var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var loginRouter = require('./src/routes/login');
var notificationRouter = require('./src/routes/notification');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/login', loginRouter);
app.use('/notification', notificationRouter);


app.use(errorController.catch404);
app.use(errorController.get404);

module.exports = app;
