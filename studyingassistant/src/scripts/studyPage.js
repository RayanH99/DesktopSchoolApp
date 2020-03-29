var startTime = 25; // this value will change depending on what the user selects, default value is 25:00
var time = startTime * 60; //number of seconds total
var intervalID; //used for setInterval()
var pomodoroTimer = document.getElementById('pomodoro-timer');
var taskMessage = document.getElementById('dropdownMenuButton');
var breakMessage = document.getElementById('dropdownMenuButton2');
var startButton = document.getElementById('startButton');
var pauseButton = document.getElementById('stopButton');


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

        startButton.classList.remove("btn-outline-info"); 
        startButton.classList.toggle("btn-info"); //fill box with colour
    
        pauseButton.classList.add("btn-outline-danger"); //remove colour from pause button
        pauseButton.classList.remove("btn-danger");
    }
}

function stopTimer(){
    clearInterval(intervalID);
    intervalID = 0;

    pauseButton.classList.remove("btn-outline-danger"); 
    pauseButton.classList.add("btn-danger"); //fill box with colour

    startButton.classList.add("btn-outline-info"); //remove colour from start button
    startButton.classList.remove("btn-info");
}

function resetTimer(){
    time = startTime * 60;
    updateTimer();
    stopTimer();
}

function setTimer(studyLength){
    startTime = studyLength;
    if(studyLength == 25){
        taskMessage.innerHTML = "✍ Regular Task | 25 minutes ";
    } else {
        taskMessage.innerHTML = "📚 Extended Task | 45 minutes ";
    }
    taskMessage.classList.remove("btn-outline-success"); 
    taskMessage.classList.add("btn-success"); //fill box with colour

    breakMessage.classList.add("btn-outline-info"); //remove colour from break button
    breakMessage.classList.remove("btn-info");

    breakMessage.innerHTML = "⏳ Break "; //reset break dropdown button text
    resetTimer();
}

function breakTimer(breakLength){
    startTime = breakLength;
    if(breakLength == 5){
        breakMessage.innerHTML = "🥪 Short Break | 5 minutes ";
    } else {
        breakMessage.innerHTML = "😴 Long Break | 15 minutes ";
    }
    breakMessage.classList.remove("btn-outline-info");
    breakMessage.classList.add("btn-info"); //fill box with colour

    taskMessage.classList.add("btn-outline-success"); //remove colour from task button 
    taskMessage.classList.remove("btn-success");  
    taskMessage.innerHTML = "🚀 Select Task "; //reset task select dropdown button text
    resetTimer();
}