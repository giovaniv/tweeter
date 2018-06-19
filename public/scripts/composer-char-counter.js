$(document).ready(function() {

  const limitChars = 140;
  let textLength = document.getElementsByName("text")[0].value;
  let counter = document.getElementsByClassName('counter')[0].innerHTML;

  if (!counter) {
    counter = limitChars;
    $('.counter').text(limitChars);
  }

  $( "section textarea" ).keypress(function( event ) {
    let typedText = event.target.value;
    let newTextLength = typedText.length;
    if (newTextLength >= limitChars) {
      $('section textarea').text(typedText);
    }
  });

  $( "section textarea" ).keydown(function( event ) {
    if (counter >= 0) {
      $('.counter').text(counter--);
    }
  });

});