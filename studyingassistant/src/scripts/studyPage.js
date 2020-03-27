var startTime = 25; // this value will change depending on what the user selects, default value is 25:00
var time = startTime * 60; //number of seconds total
var intervalID; //used for setInterval()
var pomodoroTimer = document.getElementById('pomodoro-timer');


function updateTimer(){
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds; //if seconds less than 10, make it 00, 01, 02, etc.

    pomodoroTimer.innerHTML = minutes + ':'+ seconds;
    time--;
}

function startTimer(){
    if(!intervalID){ // to prevent multiple setIntervals being queued up
        updateTimer(); // call this once to stop clock from taking too long on first use of the setInterval function
        intervalID = setInterval(updateTimer, 1000);
    }
}

function stopTimer(){
    clearInterval(intervalID);
    intervalID = 0;
}

function resetTimer(){
    time = startTime * 60;
    updateTimer();
    stopTimer();
}