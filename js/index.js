$( '.buttons >*:not(#equals)' ).click(function(e) {
  let buttonText = e.target.innerText;

  $('#screen').append(buttonText);

  if (buttonText === 'C') {
    $('#screen').text('');
  }
});

$('#equals').click(function() {
  let expression = $('#screen').text();
  $('#screen').text(eval(expression));
});
