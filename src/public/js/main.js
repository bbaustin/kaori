$(document).ready(function(){
  $.ajax(ajax);
});

var ajax = {
  url: '/getAll',
  type: 'get',
  dataType: 'json',
  success: function(articles) {
    var storedArticles = [];
    //check if shelf exists 
    for (var i = articles.length-1; i >= 0; i--) {
        storedArticles.push(articles[i]); 
        // Careful: If the append below is missing some part, the page may
        // load infinitely trying to find it. Proven case was with pictures. 
        $('.leftMain').append(
          '<div class="artbox clearfix">   <a href="' 
            + articles[i]._id              + '"> <h1 class="en"> ' 
            + articles[i].title            + '   </h1>                 <h1 class="ja">'                 
            + articles[i].jpnTitle         + '   </h1>                 </a>               <small>' 
            + articles[i].date.slice(0,10) + '   </small>              <a href="'
            + articles[i]._id              + '"> <div class="blurBox"> <img src="img/' 
            + articles[i].pictureURL       + '"> </div>                </a>               <p class="en">' 
            + articles[i].content          + '   </p>                  <p class="ja">'                 
            + articles[i].jpnContent       + '   </p>                  </div>'
        );
    }
  },
  error: function(err) {
    console.log(err);
  }
};


