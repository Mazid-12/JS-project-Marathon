const startBtn = document.getElementById("start-button");
const restartBtn = document.getElementById("restart-button");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const endScreen = document.getElementById("end-screen");
const questionText = document.getElementById("question");
const currentQuestionIndex = document.getElementById("current-question");
const totalQuestion = document.getElementById("total-questions");
const answerContainer = document.getElementById("answer-container");
const trackerSpot = document.getElementById("tracker");
const currentScore = document.getElementById("score");
const finalScore = document.getElementById("final-score");
const finalMessage = document.getElementById("final-message");

let questionsList = [{
    question: "What is the capital of Germany?",
    answers: [
        {choice: "Madrid", correct: false},
        {choice: "Paris", correct: false},
        {choice: "Rome", correct: false},
        {choice: "Berlin", correct: true},
    ]},

    {question: "How many days are there in a week?",
    answers: [
        {choice: "5", correct: false},
        {choice: "6", correct: false},
        {choice: "7", correct: true},
        {choice: "8", correct: false},
    ]},

    {question: "What animal is the largest mammal?",
    answers: [
        {choice: "Elephant", correct: false},
        {choice: "Blue Whale", correct: true},
        {choice: "Giraffe", correct: false},
        {choice: "Shark", correct: false},
    ]},

    {question: "What is 9 x 8?",
    answers: [
        {choice: "64", correct: false},
        {choice: "72", correct: true},
        {choice: "81", correct: false},
        {choice: "96", coorrect: false},
    ]},

    {question: "Which continent is Egypt located in?",
    answers: [
        {choice: "Europ", correct: false},
        {choice: "Africa", correct: true},
        {choice: "Asia", correct: false},
        {choice: "South America", correct: false},
    ]},
]


let numberQuestions = questionsList.length;
let score = 0;
let questionIndex = 1;
let trackPercentage = 0;



startBtn.addEventListener("click", start_quiz);

function start_quiz(){
    score=0;
    questionIndex=1;
    trackPercentage=0;
    currentScore.textContent = score;
    totalQuestion.textContent = numberQuestions;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    show_questions();
}
;
function show_questions(){
    currentQuestion = questionsList[questionIndex-1];

    trackPercentage = ((questionIndex-1)/numberQuestions)*100;

    currentQuestionIndex.textContent = questionIndex;
    questionText.textContent = currentQuestion.question;

    trackerSpot.style.width= trackPercentage + '%';

    answerContainer.replaceChildren();

    currentQuestion.answers.forEach(answer => {
        const answerButton = document.createElement("button");
        answerButton.textContent = answer.choice;

        answerButton.classList.add("answer-choice");

        answerButton.dataset.correct = answer.correct;

        answerButton.addEventListener("click", select_answer);
        answerContainer.appendChild(answerButton);
    });
    
    }

function select_answer(event){
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct ==='true';
    
    if(isCorrect){
        selectedButton.classList.add("correct");
        score++;
        currentScore.textContent = score;
    }
    else{
        selectedButton.classList.add("incorrect");
        Array.from(answerContainer.children).forEach(button =>{
        if(button.dataset.correct==='true'){
            button.classList.add("correct");
        }

        })
    }

    setTimeout(()=>{
        questionIndex++
        if(questionIndex<=numberQuestions){
            show_questions()
        }
        else{
            end_quiz();
        }
    }, 1500)

    function end_quiz(){
        quizScreen.classList.remove("active");
        endScreen.classList.add("active");

        finalScore.textContent = score;

        if(score==5){
            finalMessage.textContent = "Perfect! You're a genius"
        }else if(score==4){
            finalMessage.textContent = "Great job! You know your stuff"
        }else if(score==3){
            finalMessage.textContent = "Good effort! Keep learning!"
        }else if (score==2){
            finalMessage.textContent = "Not bad! Try again to improve"
        }else{
            finalMessage.textContent = "Keep studying! You'll get better"
        }   
    }
    restartBtn.addEventListener("click", restart_btn);
}

function restart_btn(){
    endScreen.classList.remove("active");
    quizScreen.classList.add("active");
    start_quiz()
}
    