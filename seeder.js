const mongoose = require('mongoose');
const dotenv = require('dotenv');
const create10Adults = require('./_data/Adult');
const create150Students = require('./_data/Student');

// load the environment variables
dotenv.config({ path: './config/config.env'});

// load models
const Adult = require('./models/Adult');
const Student = require('./models/Student');

// Connect DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); 

const adults = create10Adults();
const students = create150Students();

// import into DB
const importAdults = async () => {
  try {
    await Adult.create(adults);
    await Student.create(students);
    console.log('data imported...');
    process.exit();
  } catch (error) {
    console.error(error);
  }
}

// delete data from DB
const deleteAdults = async () => {
  try {
    await Adult.deleteMany();
    await Student.deleteMany();
    console.log('data deleted...');
    process.exit();
  } catch (error) {
    console.error(error);
  }
}

if (process.argv[2] === '-i') {
  importAdults();
} else if (process.argv[2] === '-d') {
  deleteAdults();
}