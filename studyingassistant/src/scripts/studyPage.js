var startTime = 0; // this value will change depending on what the user selects, default value is 25:00
var time = startTime * 60; //number of seconds total
var totalStudiedTime = 0; 
var studiedTime = totalStudiedTime * 60;
var totalBreakTime = 0;
var breakTime = totalBreakTime * 60;
var width = 0;

//this value is for creating 1 percent of the progress bar
// multiply and divide by 10 to avoid floating point error (check April 2, 2020 NOTE in google doc for more info)
var onePercent; 

//IDs used for setInterval for the pomodoro timer and study/break time trackers
var intervalID; 
var studiedID; 
var breakID; 

//used to differentiate between time when studying and time when on break (check March 30, 2020 NOTE in google doc for more info)
var studying = 2; 

//setting info to be changed from html document
var pomodoroTimer = document.getElementById('pomodoro-timer');
var taskMessage = document.getElementById('dropdownMenuButton');
var breakMessage = document.getElementById('dropdownMenuButton2');
var startButton = document.getElementById('startButton');
var pauseButton = document.getElementById('stopButton');
var timeStudied = document.getElementById('timeStudied');
var timeOnBreak = document.getElementById('timeOnBreak');
var progressBar = document.getElementById("myBar");

// call these once to stop clock from taking too long on first use of the setInterval function
updateTimer(); 
updateStudiedTime();
updateBreakTime();

function updateTimer(){
    let minutes = Math.floor(time/60);
    let seconds = time % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds; // if seconds less than 10, make it 00, 01, 02, etc.

    pomodoroTimer.innerHTML = minutes + ':'+ seconds;
    
    // progress bar
    if(width <= 100){
        if(time % onePercent == 0){
            width++;
            progressBar.style.width = width + "%";
        } 
        
        if(width == 100){
            clearInterval(studiedID);
            studiedID = 0;
            clearInterval(breakID);
            breakID = 0;
        }
    }


    if(time != 0) time--;
}

function startTimer(){
    if(!intervalID){ // to prevent multiple setIntervals being queued up
        
        intervalID = setInterval(updateTimer, 1000);
        if(studying == 1){
            studiedID = setInterval(updateStudiedTime, 1000);
        } else if(studying == 0){
            breakID = setInterval(updateBreakTime, 1000);
        }

        startButton.classList.remove("btn-outline-info"); 
        startButton.classList.add("btn-info"); // fill box with colour
    
        pauseButton.classList.add("btn-outline-danger"); // remove colour from pause button
        pauseButton.classList.remove("btn-danger");
    }
}

function pauseTimer(){
    clearInterval(intervalID);
    intervalID = 0;
    clearInterval(studiedID);
    studiedID = 0;
    clearInterval(breakID);
    breakID = 0;

    pauseButton.classList.remove("btn-outline-danger"); 
    pauseButton.classList.add("btn-danger"); // fill box with colour

    startButton.classList.add("btn-outline-info"); // remove colour from start button
    startButton.classList.remove("btn-info");
}

function resetTimer(){
    time = startTime * 60;
    width = 0;
    updateTimer();
    pauseTimer();
}

function setTimer(studyLength){
    startTime = studyLength;
    studying = 1;

    onePercent = (startTime * 60) * 0.01;
    width = 0;
    
    if(studyLength == 25){
        taskMessage.innerHTML = "✍ Regular Task | 25 minutes ";
    } else {
        taskMessage.innerHTML = "📚 Extended Task | 45 minutes ";
    }
    taskMessage.classList.remove("btn-outline-success"); 
    taskMessage.classList.add("btn-success"); // fill box with colour

    breakMessage.classList.add("btn-outline-info"); // remove colour from break button
    breakMessage.classList.remove("btn-info");

    breakMessage.innerHTML = "⏳ Break "; // reset break dropdown button text
    resetTimer();
}

function breakTimer(breakLength){
    startTime = breakLength;
    studying = 0;

    onePercent = (startTime * 60) * 0.01;
    width = 0;

    if(breakLength == 5){
        breakMessage.innerHTML = "🥪 Short Break | 5 minutes ";
    } else {
        breakMessage.innerHTML = "😴 Long Break | 15 minutes ";
    }
    breakMessage.classList.remove("btn-outline-info");
    breakMessage.classList.add("btn-info"); // fill box with colour

    taskMessage.classList.add("btn-outline-success"); // remove colour from task button 
    taskMessage.classList.remove("btn-success");  
    taskMessage.innerHTML = "🚀 Select Task "; // reset task select dropdown button text
    resetTimer();
}

function updateStudiedTime(){
    let studiedMinutes = Math.floor(totalStudiedTime/60);
    let studiedSeconds = totalStudiedTime % 60;

    studiedMinutes = studiedMinutes < 10 ? '0' + studiedMinutes : studiedMinutes;
    studiedSeconds = studiedSeconds < 10 ? '0' + studiedSeconds : studiedSeconds;

    timeStudied.innerHTML = studiedMinutes + ":" + studiedSeconds;
    
    totalStudiedTime++;
}

function updateBreakTime(){
    let breakMinutes = Math.floor(totalBreakTime/60);
    let breakSeconds = totalBreakTime % 60;

    breakMinutes = breakMinutes < 10 ? '0' + breakMinutes : breakMinutes;
    breakSeconds = breakSeconds < 10 ? '0' + breakSeconds : breakSeconds;

    timeOnBreak.innerHTML = breakMinutes + ":" + breakSeconds;

    totalBreakTime++;
}
