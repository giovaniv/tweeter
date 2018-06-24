
// const limitChars = 140; // Limit of chars that can be tweeted

$(document).ready(function() {

  const limitChars = 140; // Limit of chars that can be tweeted

  let obj = this.getElementsByClassName('counter')[0];
  let counter;

  //get the number of the counter
  if (obj) {
    counter = obj.innerHTML;
  }

  // if the counter is empty, it gets the limitChars
  if (!counter) {
    counter = limitChars;
    $('.counter').text(limitChars);
  }

  // everytime that we hit any key in the keyboard this event will be triggered
  $("textarea").keyup(function( event ) {

    let keyCode = event.keyCode;  //get the code of the key (because of backspace)
    let text = this.value;  // text that was typed
    let length = this.value.length; //length of this text
    let place = $(this).siblings('.counter'); //exact position that we need to put the new counter value

    // if the length is null or empty, it is limitChar
    if (!length) {
      place.text(limitChars);
    } else {
      counter = limitChars - length;  //else, we calc how many chars left
      if (keyCode === 8) {  // if user hits backspace we add, if not we sub
        place.text(counter++);
      } else {
        place.text(counter--);
      }
    }

    // if text length is higher than the limitChars...
    if (length > limitChars) {
      place.css("color", "red");  //we show counter in red color
    } else {
      place.css("color", "black");  //else, in black
    }

  });

});