const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: String,
    surname: String,
    mobileNumber: String,
    address: String,
    city: String,
    birthdate: Date,
    role: String
  });
  
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('user', userSchema, 'users');