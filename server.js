const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const path = require('path');
const cookieParser = require('cookie-parser');
dotenv.config({ path: './config/config.env' });

connectDB();

//Route files
const adults = require('./routes/adults');
const students = require('./routes/students');
const auth = require('./routes/auth');
const avatars = require('./routes/avatars');
const forgotQuestions = require('./routes/forgotQuestions');
const classrooms = require('./routes/classrooms.js');
const jobs = require('./routes/jobs');
const dwellings = require('./routes/dwellings');
const games = require('./routes/games');

const PORT = process.env.PORT || 5000;

const app = express();

// Parse JSON
app.use(express.json());

// cookie parser
app.use(cookieParser());

// display routes in console
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Security Features
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(cors());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 200,
});

app.use(limiter);

app.use(express.static(path.join(__dirname, 'public')));

// Mount Routers
app.use('/api/v1/adults', adults);
app.use('/api/v1/students', students);
app.use('/api/v1/auth', auth);
app.use('/api/v1/avatars', avatars);
app.use('/api/v1/forgotquestions', forgotQuestions);
app.use('/api/v1/classrooms', classrooms);
app.use('/api/v1/jobs', jobs);
app.use('/api/v1/dwellings', dwellings);
app.use('/api/v1/games', games);

// Error Handler must come after mount files
app.use(errorHandler);

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
