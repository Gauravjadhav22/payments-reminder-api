const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    unique:true,
    minlength: 3,
  },
  gmail: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
  },
  passwd: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  refreshToken: String,
});



UserSchema.methods.comparePassword = async function (canditatePassword) {

  const isMatch = await bcrypt.compare(canditatePassword, this.passwd);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
