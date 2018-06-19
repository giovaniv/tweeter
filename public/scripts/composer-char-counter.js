$(document).ready(function() {

//   document.addEventListener("dblclick", (event) => {
//   //console.log(event);
//   let x = event.clientX;
//   let y = event.clientY;
//   console.log(`Coordinates X-Y:(${x},${y})`);
// });

  // console.log(document.getElementsByName('text'));
  // console.log(document.getElementsByName("text")[0].value);


  const limitChars = 10;
  let textLength = document.getElementsByName("text")[0].value;
  let counter = document.getElementsByClassName('counter')[0].innerHTML;

  //console.log(textLength);

  if (!counter) {
    counter = limitChars;
    $('.counter').text(limitChars);
  }

  $( "section textarea" ).change(function( event ) {
    // // console.log(textLength);
    // // console.log(event.target.value);
    // let typedText = event.target.value;
    // let newTextLength = typedText.length;
    // if (newTextLength > limitChars) {
    //   console.log('entrou aqui');
    // }
  });

  $( "section textarea" ).keypress(function( event ) {
    let typedText = event.target.value;
    let newTextLength = typedText.length;
    if (newTextLength >= limitChars) {
      $('section textarea').text('teste');
    }
  });

  $( "section textarea" ).keydown(function( event ) {
    if (counter > 0) {
      $('.counter').text(counter--);
    }
  });

  // $( "section textarea" ).blur(function( event ) {
  //   alert( "blur" );
  // });

  // $('#texto').text(e.keyCode);

  // $('#num').text(count++);

});