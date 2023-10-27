const mongoose = require('mongoose');
const validator = require('validator');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required!!'],
    unique: true,
    lowercase: true,
  }
});


const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
