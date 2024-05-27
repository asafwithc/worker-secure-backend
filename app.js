require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const errorController = require("./src/controllers/errorController");
const jwtAuth = require("./src/middlewares/jwtAuth");
const db = require("./src/services/database");
const cors = require('cors');
const bodyParser = require('body-parser');

const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');
const loginRouter = require('./src/routes/login');
const notificationRouter = require('./src/routes/notification');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3001',
  credentials: true,
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/login', loginRouter);
app.use('/notifications', notificationRouter);

app.use(errorController.catch404);
app.use(errorController.errorHandler);

module.exports = app;
