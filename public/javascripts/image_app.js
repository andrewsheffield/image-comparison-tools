(function() {
	'use strict';

	$('.slider').slidify('.overlay', 'opacity', 0, 1, '');

	$('.btn-swipe').click(function() {
    $(this).addClass('active');
    $('.btn-grab').removeClass('active');
    $('.image-wrapper').ungrabify();
    $('.overlay').swipify();
  });
  
  $('.btn-grab').click(function() {
    $(this).addClass('active');
    $('.btn-swipe').removeClass('active');
    $('.overlay').unswipify();
    $('.image-wrapper').grabify();
  });

}());