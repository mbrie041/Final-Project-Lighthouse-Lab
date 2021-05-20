var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Cors = require("cors");
const db = require('./db');
const dbHelpers = require('./helpers/dbHelpers')(db);

var scoresRouter = require('./routes/stats');

function createNewApplication() {
  var app = express();

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(Cors());
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  return app;
}

const statsApp = function (actions) {
  const statsApp = createNewApplication('scoreApp');
  statsApp.use('/api/stats', scoresRouter(dbHelpers, actions.updateLeaderboard));

  return statsApp;
}

const chatApp = createNewApplication('chatApp');

module.exports = {
  statsApp,
  chatApp
};
