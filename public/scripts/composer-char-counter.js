$(document).ready(function() {

  const limitChars = 10;
  let counter = document.getElementsByClassName('counter')[0].innerHTML;

  if (!counter) {
    counter = limitChars;
    $('.counter').text(limitChars);
  }

  $("textarea").keyup(function( event ) {

    let keyCode = event.keyCode;
    let text = this.value;
    let length = this.value.length;
    let place = $(this).siblings('.counter');

    if (!length) {
      place.text(limitChars);
    } else {
      counter = limitChars - length;
      if (keyCode === 8) {
        place.text(counter++);
      } else {
        place.text(counter--);
      }
    }

    if (length > limitChars) {
      place.css("color", "red");
    } else {
      place.css("color", "black");
    }

  });

});





