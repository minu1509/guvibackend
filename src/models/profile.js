const mongoose = require("mongoose");
//User Collection schema Structure
const Schema = mongoose.Schema;
const ProfileModel = new Schema({
  email: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  dob: {
    type: String,
    required: true
  }

});
const profileModel = mongoose.model("profile", ProfileModel);
module.exports = profileModel;