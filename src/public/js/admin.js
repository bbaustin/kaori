$(document).ready(function(){
  $.ajax(ajax);
});



var ajax = {
  url: '/getAll',
  type: 'get',
  dataType: 'json',
  success: function(articles) {
    var storedArticles = [];
    for (var i = 0; i < articles.length; i++) {
        storedArticles.push(articles[i]);
        $('ul').append(
          '<li><h1 class="clickme">' + i + '</h1> <p> - ' + articles[i].title + 
          ': </p><p>' + articles[i]._id + 
          '</p><small>' + articles[i].content + 
          '</small></li>'
        );
    }
    console.log(storedArticles);
    $('.clickme').on('click', function() {
      var changing = storedArticles[$(this).text()];
      console.log(changing);
      $('#idToChange').val(changing._id);
      $('#titleToChange').val(changing.title);
      $('#contentToChange').val(changing.content);
    
      //// WHERE YOU LEFT OFF:
      // You're messing around with making a PATCH/UPDATE type of thing, so you can edit your articles,
      // fix typos, change content, etc. Defintiely important to have, if not for this, then in the future.

      // So my logic for patching is that you will click on the id, which will put the id into one field, and 
      // the content/title/etc in other boxes. You can then edit the content as you want, 
      // and when you submit, it will update the content/title, etc (not the ID lol) 

      // You want to be able to click and have the content jump into a TEXTAREA. Then you can change it
      // as needed, POST, and have the content saved. 

      // A distant goal is to DRYify your two JS files. :) They do kind of the same thing. 
      // Maybe grabbing the URL. If "/" append the buttons, if not do the admin functions.
      // Related to this, make sure your new "defer" things in the JS file didn't fuck anything up.


    })

  },
  error: function(err) {
    console.log(err);
  }
};

