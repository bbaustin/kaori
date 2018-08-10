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
        $('.leftMain').append(
          '<a href="/' + articles[i]._id        + '"> <div class="artbox clearfix">  <div class="aTop">  <h3> ' 
                       + articles[i].title      + '   </h3>                 <small>' 
                       + articles[i].date       + '   </small>              </div>              <div class="aLeft">   <p>' 
                       + articles[i].content    + '   </p>                  </div>              <div class="aRight">  <img src="' 
                       + articles[i].pictureURL + '"> </div>                </div>              </a>'
        );
        
    }

  },
  error: function(err) {
    console.log(err);
  }
};

