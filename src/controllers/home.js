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

HomeController.route('/getAllUsers')
  .get(function(req,res,next) {
    User.find(function(err, users) {
      res.json(users);
    });
  });

HomeController.route('/thanks') 
.get(function(req,res,next) {
  res.render('thanks');
})

HomeController.route('/archive')
.get(function(req,res,next) {
  res.render('archive');
})



//    _   ___  __  __ ___ _  _      ___ _____ _   _ ___ ___ 
//   /_\ |   \|  \/  |_ _| \| |    / __|_   _| | | | __| __|
//  / _ \| |) | |\/| || || .` |    \__ \ | | | |_| | _|| _| 
// /_/ \_\___/|_|  |_|___|_|\_|    |___/ |_|  \___/|_| |_|                                                           

HomeController.route('/adminPortal')
.get(function(req,res,next) {
  console.log(req.session.userId, 'this is the session variable')
  if (req.session.userId) {
    User.findById(req.session.userId, function(err, user) {
      console.log(user, 'this is userfind function');
      res.render('adminPortal', {
        username: user.username
      });
    });
  }
  else {
    console.log('not logged in!');
    res.render('404');
  }  
})

HomeController.route('/adminMake')
.get(function(req,res,next) {
  if (req.session.userId) {
    User.findById(req.session.userId, function(err, user) {
      res.render('adminMake');
    });
  }
  else {
    console.log('not logged in!');
    res.render('404');
  }  
})
// Register new user
.post(function(req, res, next) {
  User.findOne({username: req.body.username}, function(err, user) {
    // Should username already exist
    if (err || user) {
    res.render('adminMake', {
    message: user ? "That username already exists!" : false
    });
    } 
    // Require all Sign Up fields to be completed
    else if (!user) {
      if ((req.body.password === '') || (req.body.password_confirmation === '') || (req.body.username === '') || (req.body.nickname === '') || (req.body.secret === '')) {
        res.render('adminMake', {
        message: !user ? 'Please complete all fields!' : false
        });
      }
      // Require password and password confirmation to match
      else if (req.body.password !== req.body.password_confirmation) {
        res.render('adminMake', {
          message: req.body.password !== req.body.password_confirmation ? 'Your passwords do not match!' : false 
        });
      }
      // If secret is not correctly input. CHANGE THIS LATER lol 
      else if (req.body.secret !== '12345') {
        res.render('adminMake', {
          message: 'Dont try to sneak into my website'
        })
      }
      // If passwords match
      else if (req.body.password === req.body.password_confirmation) {
        // Make password secure with bcrypt
        bcrypt.hash(req.body.password, 10, function(err, hash) {
          // Create new user document
          User.create({
          username: req.body.username,
          password: hash,
          nickname: req.body.nickname
          },
          function(err, user) {
            if (err) {
              console.log(err);
              res.render('adminMake', {
                message: 'Please see Error Console'
              });
            }
            else {
              console.log(user);
              console.log(req.session);
              req.session.isLoggedIn = true;
              req.session.userId     = user._id;
              res.redirect('/adminPortal');
            }
          });
        });
      }
    }
  });
});

HomeController.route('/adminLogin') 
.get(function(req,res,next) {
  res.render('adminLogin');
})
.post(function(req, res, next) {
  // Find user by username
  User.findOne( {username: req.body.username }, function(err, user) {
    // Require that all fields are completed
    if ((req.body.password === '') || (req.body.username === '')) {
      res.render('adminLogin', {
      message: (req.body.password === '') || (req.body.username === '') ? 'Please complete all fields!' : false
    });
    console.log('incomplete fields');
    }
    // Should username not exist
    else if (err || !user) {
      res.render('adminLogin', {
      message: req.session.isLoggedIn ? true : "Username not found!"
      });
    console.log('username not found');
    }
    else {
      // Compare the password with hashed db password 
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if (err) {
          console.log(err);
          res.send('ERROR: ' + err);
        }
        else if (result) {
          console.log(user)
          req.session.isLoggedIn = true;
          req.session.userId     = user._id;
          res.redirect('/adminPortal');
        } 
        else {
          res.render('adminLogin', {
          message: req.session.isLoggedIn ? true : "Your password is incorrect!"
          });
        }
      });
    }
  });
});

//////    _   ___  __  __ ___ _  _      ___ _____ _   _ ___ ___ 
//////   /_\ |   \|  \/  |_ _| \| |    / __|_   _| | | | __| __|
//////  / _ \| |) | |\/| || || .` |    \__ \ | | | |_| | _|| _| 
////// /_/ \_\___/|_|  |_|___|_|\_|    |___/ |_|  \___/|_| |_| 




                                                           
// ,------. ,------. ,---. ,--------.,------.,--. ,--.,--.    
// |  .--. '|  .---''   .-''--.  .--'|  .---'|  | |  ||  |    
// |  '--'.'|  `--, `.  `-.   |  |   |  `--, |  | |  ||  |    
// |  |\  \ |  `---..-'    |  |  |   |  |`   '  '-'  '|  '--. 
// `--' '--'`------'`-----'   `--'   `--'     `-----' `-----' 
                                                           

HomeController.route('/delete')
.get(function(req, res, next) {
  if (req.session.userId) {
    User.findById(req.session.userId, function(err, user) {
      res.render('delete');
    });
  }
  else {
    console.log('not logged in!');
    res.render('404');
  }  
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
  if (req.session.userId) {
    User.findById(req.session.userId, function(err, user) {
      res.render('update');
    });
  }
  else {
    console.log('not logged in!');
    res.render('404');
  }  
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

HomeController.route('/make') 
.get(function(req, res, next) {
  if (req.session.userId) {
    User.findById(req.session.userId, function(err, user) {
      res.render('make');
    });
  }
  else {
    console.log('not logged in!');
    res.render('404');
  }  
})
.post(function(req, res, next) {
  Article.create({
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    views: 0,
    pictureURL: req.body.picFileName  //NOTE: Do you want to add  <    'img/' +  >  here? 
  })
  res.redirect('thanks');
});
                                                           
//////// ,------. ,------. ,---. ,--------.,------.,--. ,--.,--.    
//////// |  .--. '|  .---''   .-''--.  .--'|  .---'|  | |  ||  |    
//////// |  '--'.'|  `--, `.  `-.   |  |   |  `--, |  | |  ||  |    
//////// |  |\  \ |  `---..-'    |  |  |   |  |`   '  '-'  '|  '--. 
//...... `--' '--'`------'`-----'   `--'   `--'     `-----' `-----' 
                                                           

HomeController.route('/:id') 
  .get(function(req, res, next) {
    Article.findOneAndUpdate(   ///findOneAndUpdate, so that you can update Views. 
      {_id: req.params.id},
      {$inc: {views:1}},
      {new: true}, 
      function(err, art) {
        if (err) {
          console.log(err)
          res.render('404');
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
  })
});


// popular posts in front end. 
// You can easily get views from javascript using AJAX call.
// Do that and populate on each page, I guess.
// Can you use a partial for the sidebar? Probably.

// Anything else big you're missing? 
  // Keywords is gonna be hard
  // Similar logic can be used to link to author pages..? 
  // Language. i18n
  // Archive page (relatively easy)
  // 



 

module.exports = HomeController;
