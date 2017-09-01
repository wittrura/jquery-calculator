// replace x's and division signs in a string standard operand symbols
function cleanText(dirtyText) {
  let cleanText = dirtyText.replace(/x/g, '*').replace(/÷/g, '/');
  return cleanText;
}

// check if 'invalid' text is included in a string
function textContainsOperand(text) {
  return text.match(/[^0123456789C]/g);
}

// calculator logic
function handleInput(char) {
  let expression = $('#screen').text();

  // if equals sign is clicked or typed, clean and evalute expression
  if (char === '=') {
    return $('#screen').text(eval(cleanText(expression)));
  }

  // if operand is present and operand is clicked, evaluate then append
  // if operand is not present, and button is C, then clear, ELSE append what was clicked
  if(textContainsOperand(expression) && textContainsOperand(char)) {
    $('#screen').text(eval(cleanText(expression)));
    $('#screen').append(char);
  } else if (char === 'C') {
    $('#screen').text('');
  } else {
    $('#screen').append(char);
  }
}

// returns values based on which key was pressed by user
function translateKeyPress(key) {
  if (key >= 48 && key <= 57 ) {
    return (key - 48).toString();
  }
  switch(key) {
    case 43:
      return '+';
    case 47:
      return '÷';
    // lowercase 'x' and asterisk '*'
    case 42:
    case 120:
      return 'x';
    case 45:
      return '-';
    // equals sign AND return
    case 61:
    case 13:
      return '=';
    default:
    return null;
  }
}

// event handlers
// clicks on the calculator
$( '.buttons' ).click(function(e) {
  let buttonText = e.target.innerText;

  handleInput(buttonText);
});

// keyboard entry
$('body').keypress((e) => {
  let pressedKey = e.which;
  if (translateKeyPress(pressedKey)) {
    handleInput(translateKeyPress(pressedKey));
  }
});
