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
        storedArticles.push(articles[i]); // 7/6: Not sure if needed. Might be useful to access all storedArticles from front end. Hide all, etc. 
        $('.shelf').append(
          '<a href="/' + articles[i]._id + '"><div class="artbox"><h3>' 
            + articles[i].title + '</h3></div></a>'
        );
        
    }

  },
  error: function(err) {
    console.log(err);
  }
};

