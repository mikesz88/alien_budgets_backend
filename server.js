const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

//Route files
const adults = require('./routes/adults');
const students = require('./routes/students');

dotenv.config({ path: './config/config.env'});

connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

// Parse JSON
app.use(express.json());

// display routes in console
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount files
app.use('/api/v1/adults', adults);
app.use('/api/v1/students', students);

// Error Handler must come after mount files
app.use(errorHandler);

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
})