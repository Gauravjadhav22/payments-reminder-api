const validator = require("validator")
const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({

  fullname: { type: String, required: [true, "Please provide name"] },
  title: {
    type: String,
    required: [true, "Please provide title"],
    minlength: 5,
  },
  description: {
    type: String,
  
  
  },
  gmail: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
  },
  contact: { type: String, minlength: 10, maxlength: 10 },

  paid:{
    type:Boolean,
    default:false
  }
,
  emailsAWeek: { type: Number, default: 1,  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',//this refs to the user model and populates the user or gets the user using this we can find the creater or user of this object
    required: true,
  },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

module.exports = mongoose.model("Payment", PaymentSchema);
