//Swipe tool for revealing the overlay
(function( $ ) {
  
  $.fn.swipify = function() {
    var _this = $(this);
    var parent = $(this).parent();
    var maxWidth = parent.width();
    var maxHeight = parent.height();
    
    parent.addClass('slideCursor')
    
    parent.on('mousedown', function( event ) {
      event.preventDefault();
      $(window).bind('mousemove', function ( event ) {
        swipe(event);
      })
    });
    $(window).on('mouseup', function() {
      $(window).unbind('mousemove');
    })
    
    function swipe ( event ) {
      var offset = parent.offset();
      var mouse = {
        left: event.clientX - offset.left,
        top: event.clientY - offset.top
      }
      var percentWidth = 100 / maxWidth * mouse.left;
      
      _this.css({
        "width": percentWidth + "%"
      });
    }
      

    
    return _this;
  }
  
})( jQuery );

(function( $ ) {
  'use strict';
  
  $.fn.unswipify = function() {
    var _this = this;
    var parent = _this.parent();
    parent.unbind('mousedown');
    parent.removeClass('slideCursor');
  }
  
})( jQuery );

(function ( $ ) {
  
  $.fn.slidify = function(objSelector, cssSelector, minValue, maxValue, cssPostfix) {
    var _this = this;
    var indicator = _this.find('.indicator');
    var maxLeft = _this.width() - indicator.width();
    var obj = $(objSelector);
    var diff = maxValue-minValue;
    
   _this.on('mousedown', function( event ) {
     event.preventDefault();
     $(window).bind('mousemove', function () {
       var percent = moveIndicator();
       var value = (percent * diff) + minValue;
       obj.css(cssSelector, value)
     })
   });
    
    $(window).on('mouseup', function() {
      $(window).unbind('mousemove');
    })
   
   function moveIndicator() {
     var mouse = {
       left: event.clientX - _this.offset().left,
       top: event.clientY - _this.offset().top
     }
     var left = mouse.left - (indicator.width() /2)
     left = left > maxLeft ? maxLeft : left;
     left = left <= 0 ? 0 : left;
     indicator.css('left', left);
     return 1 / maxLeft * left;
   }
    
    
    
    return _this;
  }
  
})(jQuery);

$('.slider').slidify('.overlay', 'opacity', 0, 1, '');

(function( $ ) {
  'use strict';
  
  $('.zoom-in').click(function() {
    var iw = $('.image-wrapper');
    var widthInPx = iw.width();
    var heightInPx = iw.height();
    var parent = iw.parent();
    var widthInPr = widthInPx / parent.width() * 100;
    var heightInPr = heightInPx / parent.height() * 100;
    var newWidthInPr = widthInPr + 50;
    var newHeightInPr = heightInPr + 50;
    newWidthInPr = newWidthInPr > 400 ? 400 : newWidthInPr;
    newHeightInPr = newHeightInPr > 400 ? 400 : newHeightInPr;
    iw.css({
      'width': newWidthInPr + "%",
      'height': newHeightInPr + "%"
    });
    setZoomInfo(newWidthInPr);
  });
  
  $('.zoom-out').click(function() {
    var iw = $('.image-wrapper');
    var widthInPx = iw.width();
    var heightInPx = iw.height();
    var parent = iw.parent();
    var widthInPr = widthInPx / parent.width() * 100;
    var heightInPr = heightInPx / parent.height() * 100;
    var newWidthInPr = widthInPr - 50;
    var newHeightInPr = heightInPr - 50;
    newWidthInPr = newWidthInPr < 100 ? 100 : newWidthInPr;
    newHeightInPr = newHeightInPr < 100 ? 100 : newHeightInPr;
    iw.css({
      'width': newWidthInPr + "%",
      'height': newHeightInPr + "%"
    });
    setZoomInfo(newWidthInPr);
    
    var newLeft = parseInt(iw.css('left'));
    var newTop = parseInt(iw.css('top'));
    var pWidth = parent.width();
    var pHeight = parent.height();
    newLeft = Math.abs(newLeft) + pWidth > iw.width() ? -(iw.width() - pWidth) : newLeft;
    newTop = Math.abs(newTop) + pHeight > iw.height() ? -(iw.height() - pHeight) : newTop;
    iw.css({
      'left': newLeft + "px",
      'top': newTop + "px"
    });
    
  });
  
  function setZoomInfo(value) {
    $('.zoom-info').html(value + "%");
  }
  
})( jQuery );

(function( $ ) {
  'use strict';
  
  $.fn.grabify = function() {
    var _this = this;
    var parent = _this.parent();
    var mouseClicked = {};
    var objClicked = {};
    
    _this.addClass('grabCursor');
    
    _this.on('mousedown', function( event ) {
      _this.removeClass('grabCursor')
      _this.addClass('grabbingCursor')
      event.preventDefault();
      mouseClicked.left = event.clientX;
      mouseClicked.top = event.clientY;
      objClicked.left = parseInt(_this.css('left'));
      objClicked.top = parseInt(_this.css('top'));
      objClicked.width = _this.width();
      objClicked.height = _this.height();
      $(window).on('mousemove', function ( event ) {
        moveImage(event);
      });
    });
    
    $(window).on('mouseup', function() {
      _this.addClass('grabCursor')
      _this.removeClass('grabbingCursor')
      $(window).unbind('mousemove');
    })
    
    function moveImage( event ) {
      var mouse = {
        left: event.clientX - mouseClicked.left,
        top: event.clientY - mouseClicked.top
      }
      
      var newLeft = objClicked.left + mouse.left;
      var newTop = objClicked.top + mouse.top;
      var pWidth = parent.width();
      var pHeight = parent.height();
      newLeft = newLeft >= 0 ? 0 : newLeft;
      newTop = newTop >= 0 ? 0 : newTop;
      newLeft = Math.abs(newLeft) + pWidth > objClicked.width ? -(objClicked.width - pWidth) : newLeft;
      newTop = Math.abs(newTop) + pHeight > objClicked.height ? -(objClicked.height - pHeight) : newTop;
      _this.css({
        'left': newLeft + "px",
        'top': newTop + "px"
      });
      
    }
    
  }
  
})( jQuery );

(function( $ ) {
  'use strict';
  
  $.fn.ungrabify = function() {
    var _this = this;
    _this.removeClass('grabCursor');
    _this.unbind('mousedown');
  }
  
})( jQuery );

(function ( $ ) {
  'use strict';
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
})( jQuery );

