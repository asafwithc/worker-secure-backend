const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name."],
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: [true, "Please enter your email."],
      unique: true
    },
    notifications: [{
      type: String
    }]
  }
);

userSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          user.password = hash;
          next();
      });
  });
});

module.exports = mongoose.model('User', userSchema);
