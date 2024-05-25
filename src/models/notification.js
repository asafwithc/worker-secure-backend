const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notificationSchema = Schema(
  {
    date: {
      type: String,
    },
    screenshotURI: {
      type: String
    },
    info: {
        type: String
    },
    email: {
        type: String,
        ref: 'User'
    }
  }
);


module.exports = mongoose.model('Notification', notificationSchema);