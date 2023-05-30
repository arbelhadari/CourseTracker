const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const validator = require('validator');      // not working
const Schema = mongoose.Schema;


// TODO: consider adding course list
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


// check email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

// static signup method
UserSchema.statics.signup = async function(email, password) {
    if (!email || !password) {
        throw Error("All fields must be filled");
    }
if (!validateEmail(email)) {
    throw Error("Email not valid.");
}

    const exists = await this.findOne({email});
    if (exists) {
        throw Error("User Already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({email, password: hash});
    return user;
}

// static login method
userSchema.statics.login = async function(email, password) {

    if (!email || !password) {
      throw Error('All fields must be filled')
    }
  
    const user = await this.findOne({ email })
    if (!user) {
      throw Error('Incorrect email')
    }
  
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw Error('Incorrect password')
    }
  
    return user
  }

module.exports = mongoose.model('User', UserSchema);