$(document).ready(function () {

    $('#main').load('main.html');

  function deselect(e) {
    $('#main').load('main.html');
    e.removeClass('selected');
  }

  $('#controls-link').click(function () {
    if ($(this).hasClass('selected')) {
      deselect($(this));
    } else {
      $(this).addClass('selected');
      $('#main').load('controls.html');
    }
    return false;
  });

  $('.close').click(function () {
    deselect($('#controls-link'));
    return false;
  });

});