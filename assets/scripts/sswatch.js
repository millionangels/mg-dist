/* Chrome fix for focusing jump link elements */
window.addEventListener("hashchange", function(event) {
  var element = document.getElementById(location.hash.substring(1));
  if (element) {
    if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
      element.tabIndex = -1;
    }
    element.focus();
  }
}, false);

(function($){

})(jQuery);

(function($){

  /* Auto formats select inputs */
  $("select").wrap("<div class='select-wrapper'></div>");
  $(".select-wrapper").append("<i class='fa fa-angle-down' aria-hidden='true'></i>");

  /* Dropdown/Accordion toggle control */
  // adds accessible icon to toggle button
  $(document).on("click", ".drawer-toggle", function(event){
    event.preventDefault();
    $(this).next(".drawer").toggleClass("open");
    $(this).toggleClass("open");
    if($(this).next(".drawer").hasClass("open")){
      $(this).next(".drawer").slideDown("fast").attr("aria-expanded", "true");
      $(this).attr("aria-expanded", "true");
    }else{
      $(this).next(".drawer").slideUp("fast").attr("aria-expanded", "false");
      $(this).attr("aria-expanded", "false");
    }
  });

  // Close dropdown when it loses focus
  $('body').focusin(function(e) {
    $('.drawer-wrapper, .has-submenu').each(function(){
      if(!$(e.target).is($(this).find('*'))){
        $(this).find('.drawer').slideUp('fast').removeClass('open').attr('aria-expanded', 'false');
        $(this).find('.drawer-toggle').attr('aria-expanded', 'false');
        $(this).find('.drawer-toggle').removeClass('open');
      }
    });
  });
  
})(jQuery);
/*(function($){
  generatePalette();
  $(".palette_info-default, .palette_info-light, .palette_info-dark").click(function(){
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(this).text()).select();
    document.execCommand("copy");
    $temp.remove();
  });
})(jQuery);

function generatePalette(){
  $(".palette").each(function(){
    var defaultColor = $(this).css('backgroundColor');
    var lightColor = $(this).find('.palette_light').css('backgroundColor');
    var darkColor = $(this).find('.palette_dark').css('backgroundColor');
    $(this).next('div').find('.palette_info-default').prepend(rgb2hex(defaultColor));
    $(this).next('div').find('.palette_info-light').prepend(rgb2hex(lightColor));
    $(this).next('div').find('.palette_info-dark').prepend(rgb2hex(darkColor));
  });
}

function rgb2hex(rgb) {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  function hex(x) {
      return ("0" + parseInt(x).toString(16)).slice(-2);
  }
  return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}*/


(function($){

  // Attaches an icon that line breaks with the last word in the targeted element
  // data-attach-icon takes font awesome icon class name as the value (excluding the fa prefix)
  $('*[data-attach-icon-after], *[data-attach-icon-before').each(function(index, element) {
    var text = $(element), word_array, last_word, first_word, first_part;
    var attr = $(this).attr('data-attach-icon-after');

    if(typeof attr !== typeof undefined && attr !== false){
      var icon = $(this).attr('data-attach-icon-after');
      word_array = text.html().split(/\s+/);
      last_word = word_array.pop();
      first_part = word_array.join(' ');
      text.html([first_part, ' <span class="no-break">', last_word, '<i class="fa fa-' + icon + '" aria-hidden="true"></i></span>'].join(''));
    }else{
      var icon = $(this).attr('data-attach-icon-before');
      word_array = text.html().split(/\s+/);
      first_word = word_array.shift();
      first_part = word_array.join(' ');
      text.html([' <span class="no-break"><i class="fa fa-' + icon + '" aria-hidden="true"></i>', first_word, '</span> ', first_part].join(''));
    }

  });

  // Dismiss alerts
  $('.alert__close').click(function(e){
    $(this).closest('.alert').remove();
  });

  // Wraps tables for mobile scrolling
  $('table').wrap('<div class="table-wrapper"></div>');

})(jQuery);
(function($){


})(jQuery);
(function($){
  var prevLocation;

  $('*[popup]').click(function(){
    prevLocation = $(this);
    var target = '#' + $(this).attr('popup');
    $('body').addClass('popup--open');
    $('body').append('<div class="popup__overlay"></div>');
    $(target).fadeIn('fast');
    $('.popup__overlay').fadeIn('fast');
    $(target).find('.popup__close').focus();
  });

  $(document).on('click', '.popup__close, .popup__overlay', function(){
    $('body').removeClass('popup--open');
    $('.popup__overlay').remove();
    $('.popup').hide();
    prevLocation.focus();
  });

})(jQuery);
(function($){

  $(".slider__btn--prev").click(function(){
    if(window.matchMedia('(max-width: 767px)').matches) {
      $(".slider__slide--mobile.active").each(function(){
        if($(this).is(":first-child") == true){
          if($(this).closest(".slider__slide").is(":first-child") == true){
            $(this).closest(".slider__slide").removeClass("active");
            $(".slider__slide:last-child").addClass("active").find(".slider__slide--mobile:last-child").addClass("active");
          }else{
            $(this).closest(".slider__slide").removeClass("active").prev(".slider__slide").addClass("active").find(".slider__slide--mobile:last-child").addClass("active");
          }
        } else {
          $(this).prev(".slider__slide--mobile").addClass("active");
        }
        $(this).removeClass("active");
      });
    } else {
      $(".slider__slide.active").each(function(){
        $(this).find(".slider__slide--mobile.active").removeClass('active');
        if($(this).is(":first-child") == true){
          $(".slider__slide:last-child").addClass("active").find(".slider__slide--mobile:first-child").addClass("active");
        }else{
          $(this).prev(".slider__slide").addClass("active").find(".slider__slide--mobile:first-child").addClass("active");
        }
        $(this).removeClass("active");
      });
    }
  });

  $(".slider__btn--next").click(function(){
    if(window.matchMedia('(max-width: 767px)').matches) {
      $(".slider__slide--mobile.active").each(function(){
        if($(this).is(":last-child") == true){
          if($(this).closest(".slider__slide").is(":last-child") == true){
            $(this).closest(".slider__slide").removeClass("active");
            $(".slider__slide:first-child").addClass("active").find(".slider__slide--mobile:first-child").addClass("active");
          }else{
            $(this).closest(".slider__slide").removeClass("active").next(".slider__slide").addClass("active").find(".slider__slide--mobile:first-child").addClass("active");
          }
        } else {
          $(this).next(".slider__slide--mobile").addClass("active");
        }
        $(this).removeClass("active");
      });
    } else {
      $(".slider__slide.active").each(function(){
        $(this).find(".slider__slide--mobile.active").removeClass('active');
        if($(this).is(":last-child") == true){
          $(".slider__slide:first-child").addClass("active").find(".slider__slide--mobile:first-child").addClass("active");
        }else{
          $(this).next(".slider__slide").addClass("active").find(".slider__slide--mobile:first-child").addClass("active");
        }
        $(this).removeClass("active");
      });
    }
  });

})(jQuery);
(function($){
  $(".tabs__tab-control").click(function(e){
    e.preventDefault();
    var target = $(this).attr("href");
    $(".tabs__tab-control").removeClass("active").attr("aria-selected", "false");
    $(this).addClass("active").attr("aria-selected", "true");
    $(".tabs__content").removeClass("active");
    $(target).addClass("active");
  });
})(jQuery);