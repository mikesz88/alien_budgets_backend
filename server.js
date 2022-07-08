const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

//Route files
const users = require('./routes/users');

dotenv.config({ path: './config/config.env'});

const PORT = process.env.PORT || 5000;

const app = express();

// display routes in console
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount files
app.use('/api/v1/users', users)

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);