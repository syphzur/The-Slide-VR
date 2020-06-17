//when index page is loaded
$(document).ready(function () {

  //load main.html into main container
    $('#main').load('main.html');

  //if controls button is deselected, load main.html into main container
  function deselect(e) {
    $('#main').load('main.html');
    e.removeClass('selected');
  }

  //when controls button is clicked,
  $('#controls-link').click(function () {
    //deselect it if it was selected
    if ($(this).hasClass('selected')) {
      deselect($(this));
    } else {
    //select it if it was deselected and load controls.html into main container
      $(this).addClass('selected');
      $('#main').load('controls.html');
    }
  });

});
