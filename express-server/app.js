import 'dotenv/config.js'

import createError from 'http-errors';
import express from 'express';
import { resolve, join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import axios from 'axios';

import indexRouter from './routes/index.js';
import webhooksRouter from './routes/webhooks.js';

import transactions from './controllers/transactions.js';
import locations from './controllers/locations.js';
import cards from './controllers/cards.js';
import programs from './controllers/programs.js';

const { json, urlencoded } = express;
const { defaults } = axios;
const __dirname = resolve();
const app = express();

app.use(cors())

defaults.baseURL = process.env.FIDEL_API_BASE_URL;
defaults.headers.common['Content-Type'] = 'application/json';
defaults.headers.common['fidel-key'] = process.env.FIDEL_API_KEY;

app.set('axios', axios);
// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

app.get('/socket-test', (req, res) => {
  res.sendFile(__dirname + '/socket-test.html');
});

app.use('/api/', indexRouter);
app.use('/api/webhooks/', webhooksRouter);
app.use('/api/transactions/', transactions);
app.use('/api/programs/', programs);
app.use('/api/cards/', cards);
app.use('/api/locations/', locations);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
