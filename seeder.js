const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const create10Adults = require('./_data/Adult');
const create250Students = require('./_data/Student');
const createClassrooms = require('./_data/Classroom');
const { faker } = require('@faker-js/faker');

// load the environment variables
dotenv.config({ path: '../.env' });

// load models
const Adult = require('./models/Adult');
const Student = require('./models/Student');
const Avatar = require('./models/Avatar');
const ForgotQuestion = require('./models/ForgotQuestion');
const Classroom = require('./models/Classroom');
const Job = require('./models/Job');
const Dwelling = require('./models/Dwelling');

// Connect DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Read JSON
const avatars = JSON.parse(fs.readFileSync(`${__dirname}/_data/Avatar.json`));
const forgotQuestionList = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/ForgotQuestionList.json`)
);
const jobs = JSON.parse(fs.readFileSync(`${__dirname}/_data/JobList.json`));
const dwellings = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/Dwelling.json`)
);

// Create Classes
const the10Classes = () => {
  const classes = [];

  for (let index = 0; index < 10; index++) {
    classes.push(faker.random.alphaNumeric(6));
  }

  return classes;
};

const tenClassCodes = the10Classes();

// Faker JS
const adults = create10Adults(tenClassCodes);
const students = create250Students(tenClassCodes);

// import into DB
const importAdults = async () => {
  try {
    // await ForgotQuestion.create(forgotQuestionList);
    // await Avatar.create(avatars);
    // await Adult.create(adults);
    // await Student.create(students);
    // await createClassrooms();
    // await Job.create(jobs);
    await Dwelling.create(dwellings);
    console.log('data imported...');
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// delete data from DB
const deleteAdults = async () => {
  try {
    // await ForgotQuestion.deleteMany();
    // await Avatar.deleteMany();
    // await Classroom.deleteMany();
    // await Adult.deleteMany();
    // await Student.deleteMany();
    // await Job.deleteMany();
    await Dwelling.deleteMany();
    console.log('data deleted...');
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === '-i') {
  importAdults();
} else if (process.argv[2] === '-d') {
  deleteAdults();
}
