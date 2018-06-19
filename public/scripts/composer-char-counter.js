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

    if (!length) {
      $('.counter').text(limitChars);
    } else {
      counter = limitChars - length;
      if (keyCode === 8) {
        $('.counter').text(counter++);
      } else {
        $('.counter').text(counter--);
      }
    }

    if (length > limitChars) {
      $('.counter').css("color", "red");
    } else {
      $('.counter').css("color", "black");
    }

  });

});





