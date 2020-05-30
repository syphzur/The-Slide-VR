$(document).ready(function () {
  $('#controls-link').click(function () {
		$('#main').load('controls.html');
  });
  $('#back-link').click(function () {
		window.history.back();
  });
});