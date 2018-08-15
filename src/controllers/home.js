// Home Controller
var express         = require('express'),
    HomeController  = express.Router(),
    User            = require(__dirname + '/../models/user'),
    Article         = require(__dirname + '/../models/article'),
    // bcrypt          = require('bcrypt'),
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


HomeController.route('/delete')
.get(function(req, res, next) {
  res.render('delete');
})
.post(function(req, res, next) {
  Article.findOneAndDelete({_id: req.body.idToChange}, function(err){
    if(!err) {
      console.log('successful delete. id: ' + req.body.idToChange);
    }
    else {
      console.log('err: ' + err);
    }
    res.redirect('back');
  });
});

HomeController.route('/update')
.get(function(req, res, next) {
  res.render('update');
})
.post(function(req, res, next) {
  Article.findOneAndUpdate(
    {_id: req.body.idToChange}, 
    { $set: {'title': req.body.titleToChange, 'content': req.body.contentToChange, 'pictureURL': req.body.pictureURLToChange}},
    {new: true},
    function (err) {
      if(err) {
        console.log('update err: ' + err);
      }
      else {
        console.log('Article Successfully Updated')
      }
      res.redirect('back');
    });
});


// db.restaurant.updateOne(
//       { "name" : "Central Perk Cafe" },
//       { $set: { "violations" : 3 } }
//    );



HomeController.route('/make') 
.get(function(req, res, next) {
  res.render('make')
})
.post(function(req, res, next) {
  Article.create({
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    pictureURL: req.body.picFileName  //NOTE: Do you want to add  <    'img/' +  >  here? 
  })

  res.redirect('thanks');
});


/* DELETE /tasks/:id        
// working! was throwing an error, because you were res.json'ing, then trying to render a page (or vice versa). This allows ANY USER to type in an ID (which is ostensibly hidden?) in the URL and delete that in the DB.  */
// getting a favico error 
HomeController.route('/:id') 
  .get(function(req, res, next) {
    Article.findById(req.params.id, function(err, art) {
      if (err) {
        console.log(err)
      }
      else {
        console.log('art: ' + art);

        res.render('article', {
          renPictureURL: 'img/' + art.pictureURL,
          renTitle: art.title,
          renAuthor: art.author,
          renDate: art.date,
          renContent: art.content
        })
      }
    });
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
