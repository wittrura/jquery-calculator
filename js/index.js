function cleanText(dirtyText) {
  // replace X' and division signs with standard operand symbols
  let cleanText = dirtyText.replace(/x/g, '*').replace(/÷/g, '/');
  return cleanText;
}

function textContainsOperand(text) {
  // console.log(text);
  return text.match(/[^0123456789C]/g);
}

$( '.buttons >*:not(#equals)' ).click(function(e) {
  let expression = $('#screen').text();
  let buttonText = e.target.innerText;

  // if operand is present and operand is clicked, evaluate then append
  // if operand is not present, and button is C, then clear, ELSE append what was clicked
  if(textContainsOperand(expression) && textContainsOperand(buttonText)) {
    $('#screen').text(eval(cleanText(expression)));
    $('#screen').append(buttonText);

  } else if (buttonText === 'C') {
    $('#screen').text('');

  } else {
    $('#screen').append(buttonText);
  }
});

$('#equals').click(function() {
  let expression = $('#screen').text();

  $('#screen').text(eval(cleanText(expression)));
});

// TODO - add for logic keyboard input
function translateKeyPress(key) {
  if (key >= 48 && key <= 57 ) {

  }
  switch(key) {

  }
}

$('body').keypress((e) => {
  console.log(e.which);
});
