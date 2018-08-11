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
      $('#pictureURLToChange').val('img/' + changing.pictureURL)

    })

  },
  error: function(err) {
    console.log(err);
  }
};

