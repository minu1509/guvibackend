const mongoose = require("mongoose");
//User Collection schema Structure
const Schema = mongoose.Schema;
const UserModel = new Schema({
  userName: {
    type: String,
    required: true
   },
   email: {
    type: String,
    required: true
   },
  password: {
    type: String,
    required: true
   }

});
const userModel = mongoose.model("users", UserModel);
module.exports = userModel;