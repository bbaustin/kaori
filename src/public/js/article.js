$('.lang').on('click', function() {
  // for (var i = 0; i < $('.ja').length; i++) {
  //   console.log($('.ja')[i].innerText);
  //   if ($('.ja')[i].innerText !== '') {
      $('.ja').toggle();      
      $('.en').toggle();
  //   }
  // }
});


// Bad if there is no Japanese title/content. Can't figure out how to make that work right now. 
