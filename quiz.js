function Game () {
  // this.totalQuestions = 0;
  // this.questionsPerQuiz = 15;
  this.questions = [
    {
      question: `What is printed in the console? <br>
       <div class='code-snippet'>var text = 'outside'; <br>
       function logIt(){ <br>
        &nbsp;&nbsp;&nbsp;  console.log(text); <br>
        &nbsp;&nbsp;&nbsp;  var text = 'inside'; <br>
       }; <br>

       logIt();</div>`,
      answers: [
        'outside',
        'inside',
        'will throw an error',
        'undefined'
      ],
      correctAnswer: 3
    },
    {
      question: `Determine the output of the code below <br>
      console.log(0.1 + 0.2); <br>
      console.log(0.4 + 0.1 == 0.5);`,
      answers: [
        '0.3 and true',
        '0.30000000000000004 and false',
        '0.30000000000000004 and true',
        'none of the above'
      ],
      correctAnswer: 1
    },
    {
      question: "How can you detect the client's browser name?",
      answers: [
        'navigator.appName',
        'browser.name',
        'client.navName',
        'none of the above'
      ],
      correctAnswer: 0
    },
    {
    question: "Which of the following function of Number object formats a number with a specific number of digits to the right of the decimal?",
    answers: [
      'toExponential()',
      'toFixed()',
      'toPrecision()',
      'toLocaleString()'
    ],
    correctAnswer: 1
    },
    {
    question: `What does this function do? <br>
    function whatDoesItDo(val){
      return val ? 1 : 2;
    }`,
    answers: [
      'it return val',
      'it always returns 2',
      'it returns 1 if val is truthful, otherwise 2',
      'none of the above'
    ],
      correctAnswer: 2
    },
    {
    question: `What will be the output of the following code? <br>
    alert(typeof typeof(typeof(undefined)));`,
    answers: [
      'undefined',
      'string',
      'null',
      'Error in the code'
    ],
    correctAnswer: 1
    },
    {
    question: `What will be the output of the following code? <br>
    alert([1,2] + [3,4]);`,
    answers: [
      '1,23,4',
      '154',
      '1,5,4',
      'Error in the code'
    ],
    correctAnswer: 1
  },
    {
    question: `What will be the output of the following code? <br>
    (function() {<br>
      var a = b = 5;<br>
     })();<br>

    console.log(b);`,
    answers: [
     'undefined',
     'b',
     '5',
     'will throw an error'
    ],
    correctAnswer: 2
  },
    {
      question: "What is the alternate name for JavaScript",
      answers: [
       'LimeScript',
       'ECMScript',
       'ECMAScript',
       'both b and c'
      ],
      correctAnswer: 2
    },
    {
    question: "Which of the following is a server-side JavaScript object?",
    answers: [
      'Function',
      'File',
      'FileUpload',
      'Date'
    ],
    correctAnswer: 1
    },
    {
    question: "How to append a value to an array of JavaScript",
    answers: [
      'arr[arr.length] = value',
      'arr[arr.length+1] = new Arrays()',
      'arr[arr.length-1] = value',
      'arr[arr.length*1] = value'
    ],
    correctAnswer: 0
    },
  {
  question: `What will be the output of the following code? <br>
  alert('121212'.split('2').join('2));`,
  answers: [
    '111111',
    '222222',
    '212121',
    '121212'
  ],
  correctAnswer: 3
},
  {
  question: "Why so Java and JavaScript have similar name?",
  answers: [
    'The syntax of JavaScript is loosely based on Java syntax',
    {
      question: "Which of the following method is used to evaluate a string of Java Script code in the context of the specified object?",
      answers: [
        'Eval',
        'ParseDoule',
        'ParseObject',
        'Efloat'
      ],
      correctAnswer: 0
    },
    'JavaScript is a stripped-down version of Java',
    'They both support Object Oriented Programming',
    'None of the above'
  ],
  correctAnswer: 2
  },

  {
    question: "Which of the ways below is incorrect of instantiating a date?",
    answers: [
      'new Date(dateString)',
      'new Date(seconds)',
      'new Date()',
      'new Date(year, month, day, hours, minutes, seconds, milliseconds);'
    ],
    correctAnswer: 1
  },
  ];
  // this.questions[2].answers[this.questions[2].correctAnswer]
  this.currentQuestion="";
  this.numCorrect = 0;
  this.originalLength = this.questions.length;
}


Game.prototype.giveRandomQuestion = function () {
  var randomNumber = Math.floor((Math.random() * this.questions.length));
  this.currentQuestion = this.questions[randomNumber];
  this.questions.splice(randomNumber, 1);
  return this.currentQuestion;
};

Game.prototype.compareCorrectAnswer = function (answer) {
  if (this.currentQuestion.answers[this.currentQuestion.correctAnswer] === answer) {
    console.log('Your answer is correct');
    this.numCorrect++;
    console.log(this.numCorrect);
  }
  else {
    console.log('Your answer is wrong');
  }
};


//-------------- end of the game logic-----------------


// console.log(questions[randomNumber].answers.a);



//-------------- DOM manipulation starts -----------------

var quiz = new Game();

$('#start').on('click',function () {
// console.log(randomQuestion);
  createQuestion();
});

$('.answers').on('click',function () {
  //first we need to compare the answer and icnrease the value if its correct
  //
  var userChoice = $(this).text();
  quiz.compareCorrectAnswer(userChoice);
  $('#results').empty();
  $('#results').append(quiz.numCorrect + ' out of ' + quiz.originalLength);

  //later, we need to show a new question
  if (quiz.questions.length !== 0){
    createQuestion();
  }
  else {
    // show results
    showResults();
  }
});

function createQuestion(){
  this.totalQuestions++;
  var randomQuestion = quiz.giveRandomQuestion();

  $("#question-title").empty();
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

function showResults() {
  $('#finalPopUp').removeClass('hide');
}

  $('#PlayAgain').on('click',function () {
    $("#question-title").empty();
    $('#option1').empty();
    $('#option2').empty();
    $('#option3').empty();
    $('#option4').empty();
    $('#results').empty();
    $('#finalPopUp').addClass('hide');
    createQuestion();
  });

// are there more questions?
// if there're
// check if totalQuestions <
// otherwise
// show results
// show that iam out of questions (js) control if questions.length = 0
// container box results
