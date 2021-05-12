var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Cors = require("cors");
const db = require('./db');
const dbHelpers = require('./helpers/dbHelpers')(db);

var indexRouter = require('./routes/index');
var scoresRouter = require('./routes/scores');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(Cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/scores', scoresRouter(dbHelpers));
module.exports = app;