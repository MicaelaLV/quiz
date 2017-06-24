//Questions:

var questions = [
  {
    question: "How do you write 'Hello World' in an alert box?",
    answers: {
      a: 'msgBox("Hello World")',
      b: 'alertBox("Hello World")',
      c: 'alert("Hello World")'
    },
    correctAnswer: "c"
  },
  {
    question: "How do you find the number with the highest value of x and y?",
    answers: {
      a: 'Math.ceil(x, y)',
      b: 'Math.max(x, y)',
      c: 'ceil(x, y)'
    },
    correctAnswer: "b"
  },
  {
    question: "How can you detect the client's browser name?",
    answers: {
      a: 'navigator.appName',
      b: 'browser.name',
      c: 'client.navName',
    },
    correctAnswer: "a"
  }
];


var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

// function buildQuiz(questions, quizContainer, resultsContainer, submitButton){

function buildQuiz(questions, quizContainer, resultsContainer, submitButton){

function showQuestions(questions, quizContainer){
  // store the output and the answer choices
  var output = [];
  var answers;

  // for each question...
  for(var i = 0; i < questions.length; i++){
    
    // first reset the list of answers
    answers = [];

    // for each available answer to this question...
    for(option in questions[i].answers){

      // add an html radio button
      answers.push(
        '<label>'
          + '<input type="radio" name="question'+i+'" value="'+option+'">'
          + option + ': '
          + questions[i].answers[option]
        + '</label>'
      );
    }

    // add this question and its answers to the output
    output.push(
      '<div class="question">' + questions[i].question + '</div>'
      + '<div class="answers">' + answers.join('') + '</div>'
    );
  }

  // combine output list into one string of html and put it on the page
  quizContainer.innerHTML = output.join('');
}
// }

showQuestions(questions, quizContainer);


function showResults(questions, quizContainer, resultsContainer){
  
  // gather answer containers from quiz
  var answerContainers = quizContainer.querySelectorAll('.answers');
  
  // keep track of user's answers
  var userAnswer = '';
  var numCorrect = 0;
  
  // for each question...
  for(var i = 0; i < questions.length; i++){

    // find selected answer
    userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
    
    // if answer is correct
    if(userAnswer===questions[i].correctAnswer){
      // add to the number of correct answers
      numCorrect++;
      
      // color the answers green
      answerContainers[i].style.color = 'lightgreen';
    }
    // if answer is wrong or blank
    else{
      // color the answers red
      answerContainers[i].style.color = 'red';
    }
  }

  // show number of correct answers out of total
  resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
}

// show quiz results on submit
submitButton.onclick = function(){
  showResults(questions, quizContainer, resultsContainer);
}

}

buildQuiz(questions, quizContainer, resultsContainer, submitButton);





