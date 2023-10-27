const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');



process.on('uncaughtException', (err) => {
  console.log(err);
  console.log('UNHANDLED ERROR!!! Shutting Down...');
  process.exit(1);
});

const app = require('./app');

dotenv.config({ path: './config.env' });

app.use(morgan('dev'));


const LDB = "mongodb://localhost:27017/learn";


mongoose
  .connect(LDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connection established!!');
  });

const db=mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



const port = 7000;
const server = app.listen(port, () => {
  console.log(`App running on port:${port}`);
});


// Unhandled Rejection
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED ERROR!!! Shutting Down...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
