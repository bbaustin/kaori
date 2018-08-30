// Article Model
var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
  title: String,
  jpnTitle: String,

  author: String,

  content: String,
  jpnContent: String,

  pictureURL: String, 
  keywords: [{type: String}],
  views: Number, 
  
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Article', ArticleSchema);
