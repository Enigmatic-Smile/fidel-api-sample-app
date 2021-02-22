require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const axios = require('axios');

const indexRouter = require('./routes/index');
const webhooksRouter = require('./routes/webhooks');

const app = express();

axios.defaults.baseURL = process.env.FIDEL_API_BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['fidel-key'] = process.env.FIDEL_API_KEY;


app.set('axios', axios);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/socket-test', (req, res) => {
  res.sendFile(__dirname + '/socket-test.html');
});

app.use('/api/', indexRouter);
app.use('/api/webhooks/', webhooksRouter);
app.use('/api/transactions/', require('./controllers/transactions'));
app.use('/api/programs/', require('./controllers/programs'));
app.use('/api/cards/', require('./controllers/cards'));
app.use('/api/locations/', require('./controllers/locations'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
