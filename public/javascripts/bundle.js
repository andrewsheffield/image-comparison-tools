/* $.swipify will track the mouse over the image to adjust
*  the width of the overlay to the mouses location
*  Use $.unswipify to remove bound actions.
*/
(function( $ ) {
  
  $.fn.swipify = function() {
    var _this = $(this);
    var parent = $(this).parent();
    var maxWidth = null;
    var maxHeight = null;
    var parentOffset = null;
    var percentConst = null;
    
    parent.addClass('slideCursor')
    
    //Variables initialized on click to account for window adjusments
    //after init.
    parent.on('mousedown', function( event ) {
      event.preventDefault();
      parentOffset = parent.offset();
      maxWidth = parent.width();
      maxHeight = parent.height();
      percentConst = 100 / maxWidth;
      $(window).bind('mousemove', function ( event ) {
        swipe(event);
      })
    });
    $(window).on('mouseup', function() {
      $(window).unbind('mousemove');
    })
    
    //Every possible calculation is done on init or 
    //mousedown to maximize performace
    function swipe ( event ) {
      var mouse = {
        left: event.clientX - parentOffset.left,
        top: event.clientY - parentOffset.top
      }
      var percentWidth = percentConst * mouse.left;
      
      _this.css({
        "width": percentWidth + "%"
      });
    }
      

    
    return _this;
  }

  $.fn.unswipify = function() {
    var _this = this;
    var parent = _this.parent();
    parent.unbind('mousedown');
    parent.removeClass('slideCursor');
  }
  
})( jQuery );

/*
* This is a reusable slider plugin that allows any slider to
* be actioned from js, the slider can adjust any css property
* with a min and a max,
* $.slidify(selectorForObject, cssPoperty, MinValue, maxValue, postfixForCSSProperty)
*/
(function ( $ ) {
  
  $.fn.slidify = function(objSelector, cssSelector, minValue, maxValue, cssPostfix) {
    var _this = this;
    var indicator = _this.children('.indicator');
    var indicatorWidth = indicator.width();
    var maxLeft = _this.width() - indicator.width();
    var obj = $(objSelector);
    var diff = maxValue - minValue;
    
   _this.on('mousedown', function( event ) {
     event.preventDefault();
     runSliderActions();
     $(window).bind('mousemove', function () {
       runSliderActions();
     })
   });
    
    $(window).on('mouseup', function() {
      $(window).unbind('mousemove');
    })

    function runSliderActions() {
      var percent = moveIndicator();
      var value = (percent * diff) + minValue;
      obj.css(cssSelector, value)
    }
   
    function moveIndicator() {
      var mouse = {
        left: event.clientX - _this.offset().left,
        top: event.clientY - _this.offset().top
      }
      var left = mouse.left - (indicatorWidth /2)
      left = left > maxLeft ? maxLeft : left;
      left = left <= 0 ? 0 : left;
      indicator.css('left', left);
      return 1 / maxLeft * left;
    }
    return _this;
  }
  
})(jQuery);

/* Not a plugin, this is jQuery action on zoom, it adjusts zoom by 50% each click
* It ensures the image cannot go beyond 400% or below 100%
* Zoom-out has attached action to prevent the image from leaving the view port.
*/
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

/* $.grabify will track the mouse over the image to adjust
*  the location of the images on click
*  Use $.unswipify to remove bound actions.
*/
(function( $ ) {
  'use strict';
  
  $.fn.grabify = function() {
    var _this = this;
    var parent = _this.parent();
    var pWidth = null;
    var pHeight = null;
    var mouseClicked = {};
    var objClicked = {};
    
    toggleGrab();
    
    _this.on('mousedown', function( event ) {
      
      mouseClicked.left = event.clientX;
      mouseClicked.top = event.clientY;
      objClicked.left = parseInt(_this.css('left'));
      objClicked.top = parseInt(_this.css('top'));
      objClicked.width = _this.width();
      objClicked.height = _this.height();
      pWidth = parent.width();
      pHeight = parent.height();

      event.preventDefault();
      toggleGrab();
      $(window).on('mousemove', function ( event ) {
        moveImage(event);
      });
    });
    
    $(window).on('mouseup', function() {
      toggleGrab();
      $(window).unbind('mousemove');
    })
    
    function moveImage( event ) {
      var mouse = {
        left: event.clientX - mouseClicked.left,
        top: event.clientY - mouseClicked.top
      }
      
      var newLeft = objClicked.left + mouse.left;
      var newTop = objClicked.top + mouse.top;
      newLeft = newLeft >= 0 ? 0 : newLeft;
      newTop = newTop >= 0 ? 0 : newTop;
      newLeft = Math.abs(newLeft) + pWidth > objClicked.width ? -(objClicked.width - pWidth) : newLeft;
      newTop = Math.abs(newTop) + pHeight > objClicked.height ? -(objClicked.height - pHeight) : newTop;
      _this.css({
        'left': newLeft + "px",
        'top': newTop + "px"
      });
    }

    function toggleGrab() {
      if (!_this.hasClass('grabCursor')) {
        _this.addClass('grabCursor')
        _this.removeClass('grabbingCursor')
      } else {
        _this.removeClass('grabCursor')
        _this.addClass('grabbingCursor')
      }
    }
  }

  $.fn.ungrabify = function() {
    var _this = this;
    _this.removeClass('grabCursor');
    _this.unbind('mousedown');
  }
  
})( jQuery );
