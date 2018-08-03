// Home Controller
var express         = require('express'),
    HomeController  = express.Router(),
    User            = require(__dirname + '/../models/user'),
    Article         = require(__dirname + '/../models/article'),
    bcrypt          = require('bcrypt'),
    session         = require('express-session');
       

HomeController.route('/getAll')
  .get(function(req, res, next) {
    Article.find(function(err, articles) {
      res.json(articles);
    });
});


HomeController.route('/thanks') 
.get(function(req,res,next) {
  res.render('thanks');
})


HomeController.route('/make') 
.get(function(req, res, next) {
  res.render('make')
})
.post(function(req, res, next) {
  console.log('do anything??????????????????????');
  Article.create({
    title: req.body.title,
    author: req.body.author,
    content: req.body.content
  })

  res.redirect('thanks');
});


/* DELETE /tasks/:id        
// working! was throwing an error, because you were res.json'ing, then trying to render a page (or vice versa). This allows ANY USER to type in an ID (which is ostensibly hidden?) in the URL and delete that in the DB.  */
// getting a favico error 
HomeController.route('/:id') 
  .get(function(req, res, next) {
    console.log(req.params.title);
    Article.findById(req.params.id, function(err, art) {
      if (err) {
        console.log(err)
      }
      else {
        res.render('article', {
          renTitle: art.title,
          renAuthor: art.author,
          renContent: art.content
        })
      }
    });
    // console.log(req.params.id);
    // Article.findByIdAndRemove(req.params.id, function (err, task) {
    //   console.log(req.params.id);
    //   if (err) return next(err);
    //   res.json(task);
    // });
});


HomeController.route('/') 
.get(function(req, res, next) {
  res.render('home', {
    // message: 'PLACE A PARKING SPOT'
  })
});
// .post(function(req, res, next) {
//   Article.create({
//     title: req.body.title,
//     author: req.body.author,
//     content: req.body.content
//   })
//   res.redirect('thanks');
// });


 

module.exports = HomeController;
