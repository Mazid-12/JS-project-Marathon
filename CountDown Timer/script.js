const counter = document.getElementById("counter");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

let elapsedTime = 0;
let startTime = 0;
let currentTime = 0;
let timer;
let isRunning = false;
let isDisabled = true

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);


function start(){
    if(!isRunning){
    startTime = Date.now() - elapsedTime;
    timer = setInterval(update_time, 1000);
    isRunning = true;
    }
}

function stop(){
    clearInterval(timer);
    isRunning = false;

}

function reset(){
    clearInterval(timer);
    elapsedTime = 0;
    counter.textContent = "02:00";  
    isRunning = false;

}

function update_time(){
    currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let minutes = Math.floor(2 - (elapsedTime/(1000* 60)));
    let seconds =  Math.floor((2 * 60 - (elapsedTime/1000))% 60);

    if(minutes === 0 && seconds === 0){
        stop();
        elapsedTime = 0;
    }

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    counter.textContent = `${minutes}:${seconds}`;
}
