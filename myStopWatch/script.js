const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const counter = document.getElementById("counter");

let startTime;
let elapedTime = 0;
let isRunning = false;

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);

function start(){
    if(!isRunning){
        startTime = Date.now() - elapedTime;
        timer = setInterval(update, 10);
        isRunning = true;
    }

}

function stop(){
    //console.log(Date.now())
    clearInterval(timer);
    isRunning = false;
}

function reset(){
    clearInterval(timer);
    counter.textContent = '00:00:00:00';
    isRunning = false;
    elapedTime = 0;

}

function update(){
    const currentTime = Date.now();
    elapedTime = currentTime - startTime;

    let hours = Math.floor(elapedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapedTime/(1000 * 60) % 60);
    let seconds = Math.floor(elapedTime/(1000)%60);
    let milliseconds = Math.floor(elapedTime %1000 /10);

    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    milliseconds = String(milliseconds).padStart(2, '0');

    counter.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

