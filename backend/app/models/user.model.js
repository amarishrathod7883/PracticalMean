var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const userSchema = new Schema({
  FirstName: String,
  LastName: String,
  Email: String,
  Password: String,
  DOB: Date,
  Role: String,
}, { collection: 'user'});

module.exports = mongoose.model("User", userSchema);