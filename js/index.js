(function(){
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
    return $('#screen').text(trueEval(cleanText(expression)));
      // return $('#screen').text(eval(cleanText(expression)));
    }

    // handles similar to old style calculator - multiple operands do not appear in line
    // if operand is present and operand is clicked, evaluate then append
    // if operand is not present, and button is C, then clear, ELSE append what was clicked
    if(textContainsOperand(expression) && textContainsOperand(char)) {
      $('#screen').text(trueEval(cleanText(expression)));
      // $('#screen').text(eval(cleanText(expression)));
      $('#screen').append(char);
    } else if (char === 'C') {
      $('#screen').text('');
    } else {
      $('#screen').append(char);
    }
  }

  // returns values based on which key was pressed by user
  function translateKeyPress(key) {
    if (parseInt(key) || key ==='0') {
      return key;
    }
    switch(key) {
      case '+':
        return '+';
      case '/':
        return '÷';
      case '*':
      case 'x':
        return 'x';
      case '-':
        return '-';
      case 'Enter':
      case '=':
        return '=';
      case 'c':
      case 'C':
        return 'C';
      default:
      return null;
    }
  }

  // evalute without eval method
  function trueEval(expression) {
    // split the string into operand, operator, operand
    let operands = expression.split(/[\*/\-+]/g);
    let operator = expression.replace(/[\d]+/g,'')

    // checks that there are two operands before evaluating
    if (operands.length !== 1) {
      // convert operands to integer and execute expression based on operand
      switch (operator) {
        case '*':
        return parseInt(operands[0]) * parseInt(operands[1]);
        case '/':
        return parseInt(operands[0]) / parseInt(operands[1]);
        case '+':
        return parseInt(operands[0]) + parseInt(operands[1]);
        case '-':
        return parseInt(operands[0]) - parseInt(operands[1]);
        default:
        return null;
      }
    }
  }

  // event handlers
  // clicks on the calculator
  $( '.buttons' ).click(function(e) {
    let buttonText = e.target.innerText;

    handleInput(buttonText);
  });

  // keyboard entry
  $('body').keydown((e) => {
    let pressedKey = e.key;
    if (pressedKey === 'Escape') {
      handleInput('C');
    }
  });

  $('body').keypress((e) => {
    let pressedKey = e.key;
    if (translateKeyPress(pressedKey)) {
      handleInput(translateKeyPress(pressedKey));
    }
  });
})()
