const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required!!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide your email!!'],
  },
  password: {
    type: String,
    required: [true, 'Please enter password'],
    minlength: [8, 'Password should be greater than or equal to 8'],
    select: false,
  }
});

userSchema.methods.correctPassword = async function (canditatePass, userPass) {
  return canditatePass==userPass;
};


const User = mongoose.model('User', userSchema);

module.exports = User;
