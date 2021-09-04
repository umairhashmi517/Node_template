const mongoose = require('mongoose');
// Create User Schema
const userSchema = new mongoose.Schema(
{
    fullName: String,
    contact: {
        type:String,
        unique:true
    },
    email: {
      type:String,
      unique:true
    }
},
  { timestamps: true }
);

module.exports = mongoose.model('user', userSchema);