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
        $('ul').append(
          '<li><h3>' 
            + articles[i].title + ': </h3><h2>' + articles[i]._id + '</h2></div></li>'
        );
    }
    $('h2').on('click', function() {
      $('#idToDelete').val($(this).text());
    })

  },
  error: function(err) {
    console.log(err);
  }
};

