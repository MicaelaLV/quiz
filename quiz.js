function Game(){

  this.questions = [
    {
      question: `What is printed in the console?<br>
      <code>var text = 'outside'; <br>
      function logIt(){<br>
      &nbsp;&nbsp;console.log(text); <br>
      &nbsp;&nbsp;var text = 'inside'; <br>
      };<br>logIt();</code>`,
      answers: [
        'outside',
        'inside',
        'will throw an error',
        'undefined'
      ],
      correctAnswer: 3
    },{
      question: `Determine the output of the code below?<br>
      <code>console.log(0.1 + 0.2);<br>
      console.log(0.4 + 0.1 == 0.5);</code>`,
      answers: [
        '0.3 and true',
        '0.30000000000000004 and false',
        '0.30000000000000004 and true',
        'None of the above'
      ],
      correctAnswer: 2
    },{
      question: 'How can you detect the client\'s browser name?',
      answers: [
        'navigator.appName',
        'browser.name',
        'client.navName',
        'None of the above'
      ],
      correctAnswer: 0
    },{
      question: 'Which of the following function of Number object formats a number with a specific number of digits to the right of the decimal?',
      answers: [
        'toExponential()',
        'toFixed()',
        'toPrecision()',
        'toLocaleString()'
      ],
      correctAnswer: 1
    },{
      question: `What does this function do?<br>
      <code>function whatDoesItDo(val){<br>
      &nbsp;&nbsp;return val ? 1 : 2;<br>
      }</code>`,
      answers: [
        'It returns val',
        'It always returns 2',
        'It returns 1 if val is truthful, otherwise 2',
        'None of the above'
      ],
      correctAnswer: 2
    },{
      question: `What will be the output of the following code?<br>
      <code>alert(typeof typeof(typeof(undefined)));</code>`,
      answers: [
        'undefined',
        'string',
        'null',
        'Error in the code'
      ],
      correctAnswer: 1
    },{
      question: `What will be the output of the following code?<br>
      <code>alert([1,2] + [3,4]);</code>`,
      answers: [
        '1,23,4',
        '154',
        '1,5,4',
        'Error in the code'
      ],
      correctAnswer: 0
    },{
      question: `What will be the output of the following code?<br>
      <code>(function(){<br>
      &nbsp;&nbsp;var a = b = 5;<br>
      })();<br>
      console.log(b);</code>`,
      answers: [
        'undefined',
        'b',
        '5',
        'Will throw an error'
      ],
      correctAnswer: 2
    },{
      question: 'What is the alternate name for JavaScript?',
      answers: [
        'LimeScript',
        'ECMScript',
        'ECMAScript',
        'Both b and c'
      ],
      correctAnswer: 2
    },{
      question: 'Which of the following is a server-side JavaScript object?',
      answers: [
        'Function',
        'File',
        'FileUpload',
        'Date'
      ],
      correctAnswer: 1
    },{
      question: "How to append a value to an array of JavaScript",
      answers: [
        'arr[arr.length] = value',
        'arr[arr.length+1] = new Arrays()',
        'arr[arr.length-1] = value',
        'arr[arr.length*1] = value'
      ],
      correctAnswer: 0
    },{
      question: `What will be the output of the following code? <br>
      <code>alert('121212'.split('2').join('2'));</code>`,
      answers: [
        '111111',
        '222222',
        '212121',
        '121212'
      ],
      correctAnswer: 3
    },{
      question: 'Which of the following method is used to evaluate a string of Java Script code in the context of the specified object?',
      answers: [
        'Eval',
        'ParseDoule',
        'ParseObject',
        'Efloat'
      ],
      correctAnswer: 0
    },{
      question: 'Why so Java and JavaScript have similar name?',
      answers: [
        'The syntax of JavaScript is loosely based on Java syntax',
        'JavaScript is a stripped-down version of Java',
        'They both support Object Oriented Programming',
        'None of the above'
      ],
      correctAnswer: 2
    },{
      question: 'Which of the ways below is incorrect of instantiating a date?',
      answers: [
        'new Date(dateString)',
        'new Date(seconds)',
        'new Date()',
        'new Date(year, month, day, hours, minutes, seconds, milliseconds);'
      ],
      correctAnswer: 1
    }
  ];

  this.currentQuestion = '';
  this.numCorrect = 0;
  this.originalLength = this.questions.length;
}

Game.prototype.giveRandomQuestion = function(){
  var randomNumber = Math.floor((Math.random() * this.questions.length));
  this.currentQuestion = this.questions[randomNumber];
  this.questions.splice(randomNumber, 1);
  return this.currentQuestion;
};

Game.prototype.compareCorrectAnswer = function(answer){
  if (this.currentQuestion.answers[this.currentQuestion.correctAnswer] === answer) {
    console.log('Your answer is correct!');
    this.numCorrect++;
    console.log(this.numCorrect);
  } else {
    console.log('Your answer is wrong!');
  }
};

//-------------- end of the game logic-----------------



//-------------- DOM manipulation starts -----------------

var quiz = new Game();

$('#start').on('click',function(){
  if (quiz.questions.length !== 0) {
    // console.log(randomQuestion);
    createQuestion();
    $('h1').hide();
    $('.welcome-text').hide();
    $('img').hide();
    $('h3').hide();
    $('h2, .col-md-4').show();
    $('#start').html('Next');
  } else {
    // show results
    $('#score').html(quiz.numCorrect +' out of '+ quiz.originalLength);
    $('#popup, #overlay').show();
  }
});

$('.answers').on('click',function(){
  //first we need to compare the answer and icnrease the value if its correct

  var userChoice = $(this).text();
  quiz.compareCorrectAnswer(userChoice);
  $('#results').empty();
  $('#results').append(quiz.numCorrect +' out of '+ quiz.originalLength);

  //later, we need to show a new question
  if (quiz.questions.length !== 0) {
    createQuestion();
  } else {
    // show results
    $('#score').html(quiz.numCorrect +' out of '+ quiz.originalLength);
    $('#popup, #overlay').show();
  }
});

function createQuestion(){
  this.totalQuestions++;
  var randomQuestion = quiz.giveRandomQuestion();

  $('#question-title').empty();
  $('#option1').empty();
  $('#option2').empty();
  $('#option3').empty();
  $('#option4').empty();

  $('#question-title').append(randomQuestion.question);
  $('#option1').append(randomQuestion.answers[0]);
  $('#option2').append(randomQuestion.answers[1]);
  $('#option3').append(randomQuestion.answers[2]);
  $('#option4').append(randomQuestion.answers[3]);
}

$('#play').on('click',function(){
  window.location.reload();
});
