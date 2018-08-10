// Article Model
var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
  title: String,
  author: String,
  content: String,
  keywords: [String],
  pictureURL: String, 
  views: Number, 
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Article', ArticleSchema);
