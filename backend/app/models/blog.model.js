var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const blogSchema = new Schema({
  Title: String,
  Description: String,
  ModifyDate: Date,
  Status: String,
  Category: String,
  Author: String,
}, { collection: 'blog'});

module.exports = mongoose.model("Blog", blogSchema);