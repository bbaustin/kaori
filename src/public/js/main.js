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
          '<div class="artbox clearfix">  <div class="aTop">     <a href="' 
            + articles[i]._id        + '"> <h1> ' 
            + articles[i].title      + '   </h1>                 </a>                <small>' 
            + articles[i].date       + '   </small>              </div>              <div class="aLeft">   <p>' 
            + articles[i].content    + '   </p>                  </div>              <div class="aRight">  <a href="'
            + articles[i]._id        + '"> <img src="' 
            + articles[i].pictureURL + '"> </a>                  </div>              </div>'
        );
        
    }

  },
  error: function(err) {
    console.log(err);
  }
};

