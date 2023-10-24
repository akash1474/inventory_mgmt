/* eslint-disable prettier/prettier */
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/ErrorController');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const UserRouter = require('./routes/UserRoutes');
const CategoryRouter = require('./routes/CategoryRoutes');
const ProductRouter = require('./routes/ProductRoutes');

//CHECK THE DEVELOPMENT
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//SET HTTP HEADERS
app.use(helmet());

//BODY PARSER PARSES THE REQ.BODY
app.use(express.json({ limit: '10kb' }));


//DATA SANITIZATION AGAINST NOSEQL QUERY INJECTION
app.use(mongoSanitize());
//DATA SANITIZTION AGAINST XSS
app.use(xss());

app.use((req, res, next) => {
  next();
});


app.get('/api/json', (req, res) => {
  const jsonResponse = {
    message: 'This is a JSON response',
    data: {
      key1: 'value1',
      key2: 'value2'
    }
  };

  res.json(jsonResponse);
});


// app.get('/', (req, res) => {
//   res.send('Hello, this is your Express.js server with MongoDB!');
// });


// app.use('/', viewRouter);
// app.use('/api/v1/tours', tourRouter);
// app.use('/api/v1/users', userRouter);
// app.use('/api/v1/reviews', reviewRouter);
// app.use('/api/v1/bookings', bookingRouter);


app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on the server`);
  // err.statusCode = 404;
  // err.status = 'fail';
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;