var startQuiz = document.getElementById('startQuiz');
var saveButton = document.getElementById('saveScore');
var viewScores = document.getElementById('viewScores');
var playAgain = document.getElementById('playAgain');

var quizIntro = document.getElementById('quiz-title');
var quiz = document.getElementById('quiz');
var result = document.getElementById('result');

var options = document.getElementById('options');
var message = document.getElementById('message');

var timer = document.getElementById('timer');
var summary = document.getElementById('summary');

let secondsLeft = 75;
let score = 0;
let currentQuestion = 0;
let countdownTimer;


function stopGame() {
  clearInterval(countdownTimer);
  timer.textContent = '';
  quiz.style.display = 'none';
  result.style.display = 'flex';
  summary.textContent = 'Your Score Is ' + score;
}

function onSaveScore(e) {
  var initials = document.getElementById('initials').value

  if (initials !== "") {
    localStorage.setItem(initials, score);
    document.getElementById("initials").value = "";
  }
}

function onViewScores(e) {
  window.location.href = "assets/scores.html";
}

function onSelectAnswer(e) {
  var correctAnswer = questions[currentQuestion].answer;
  var userAnswer = e.target.textContent;

  if (correctAnswer === userAnswer) {
    score++;
    displayMessage('Correct');
  } else {
    secondsLeft -= 5;
    displayMessage('Wrong :-(');
  }
  currentQuestion++;

  if (currentQuestion >= questions.length) {
    stopGame();

  } else {

    displayQuestion();
  };
}

function displayMessage(msg) {
  message.textContent = msg;

  setTimeout(() => {
    message.textContent = '';
  }, 1000);
}

function displayQuestion() {
  var questionArray = questions[currentQuestion];
  console.log(questionArray.question);
  document.getElementById('question-title').textContent = questionArray.question;

  options.innerHTML = '';

  for (let i = 0; i < questionArray.choices.length; i++) {
    var option = document.createElement('button');

    option.setAttribute("class","optionBtn")
    option.textContent = questionArray.choices[i];
    option.onclick = onSelectAnswer;

    options.appendChild(option);
  }
}

function onStartGame() {
  secondsLeft -= 5;

  countdownTimer = setInterval(() => {
    if (secondsLeft > 0) {
      secondsLeft--;
      timer.textContent = 'Time Left: ' + secondsLeft;
    } else {
      stopGame();
    }
  }, 1000);

  quizIntro.style.display = 'none';
  result.style.display = 'none';
  quiz.style.display = 'block';

  displayQuestion();
}


startQuiz.addEventListener('click', onStartGame);
saveButton.addEventListener('click', onSaveScore);
viewScores.addEventListener('click', onViewScores);
playAgain.addEventListener('click', onStartGame);
