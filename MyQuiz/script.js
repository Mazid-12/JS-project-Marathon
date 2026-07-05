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
        {choice: "SOuth America", correct: false},
    ]},
]


let numberQuestions = questionsList.length;
let score = 0;
let questionIndex = 0;
let trackPercentage = 0;


startBtn.addEventListener("click", start_quiz);

function start_quiz(){

    totalQuestion.textContent = numberQuestions;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    show_questions();
}

function show_questions(){
    questionIndex = 1;
    currentQuestion = questionsList[questionIndex-1];

    trackPercentage = (questionIndex/numberQuestions)*100;

    currentQuestionIndex.textContent = questionIndex;
    questionText.textContent = currentQuestion.question;

    trackerSpot.style.width= trackPercentage + '%';

    currentQuestion.answers.forEach(answer => {
        const answerButton = document.createElement("button");
        answerButton.textContent = answer.choice;

        answerButton.classList.add("answer-choice");
        answerContainer.appendChild(answerButton);
    });
        
    



        
    }
    