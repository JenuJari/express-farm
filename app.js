var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var dburl = 'mongodb+srv://' + process.env.MONGO_USER + ':' + process.env.MONGO_PASS + '@' + process.env.MONGO_HOST + '/' + process.env.MONGO_DBNAME;
mongoose.connect(dburl, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
mongoose.Promise = global.Promise;

var app = express();

// view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set('mongoose', mongoose);
app.use(logger('dev'));

app.use(cookieParser());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use('/apis', async (req, res, next) => {
  var common_funcs = require('./repos/common_funcs');
  try {
    let user = await common_funcs.get_user_from_auth(req.headers.authorization);
    if (user && user._id) {
      req.user = user;
      next();
    }
  } catch (e) {
    common_funcs.error_resp(req, res, e);
  }
});

app.use('/', indexRouter);

// API routes
app.use('/apis/users', usersRouter);
app.use('/api/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


var db = mongoose.connection;

db.on('error', function (err) {
  throw err;
});

db.once('open', function () {
  console.log("Mongo DB Connected");
});

app.set('db', db);

module.exports = app;
