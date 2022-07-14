const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');


const path = require('path');
dotenv.config({ path: './config/config.env'});

connectDB();

//Route files
const adults = require('./routes/adults');
const students = require('./routes/students');
const auth = require('./routes/auth');

const PORT = process.env.PORT || 5000;

const app = express();

// Parse JSON
app.use(express.json());

// display routes in console
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
};

app.use(express.static(path.join(__dirname, 'public')));

// Mount Routers
app.use('/api/v1/adults', adults);
app.use('/api/v1/students', students);
app.use('/api/v1/auth', auth);

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