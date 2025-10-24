var minutes = document.getElementById("time_minutes");
var hours = document.getElementById("time_hours");
var seconds = document.getElementById("time_seconds");
var time_input = document.getElementById("time_input");

var curr_time_seconds = 0;
var startTime;
var timerStarted = false;

var interval;
var last_time_started = 0;

var study_time_tracker;

function setTracker(){
    if(localStorage.getItem("study_stats") === null){
        study_time_tracker = [];
    }
    else{
        study_time_tracker = JSON.parse(localStorage.getItem("study_stats"));
    }
}

time_input.addEventListener('change', (e) =>{
    setTime();
});

function setTime(){
    hours.value -= 0; minutes.value -=0; seconds.value -=0;    
    displayTime(hours.value, minutes.value, seconds.value);
    curr_time_seconds = (hours.value * 3600) + minutes.value * 60 + seconds.value * 1;
    last_time_started = curr_time_seconds;
}

function displayTime(h, m, s){
    time_display.innerHTML = (h > 0 ? h + ':' : '') + (m >= 10 ? m : '0' + m) + ":" + (s >= 10 ? s : '0' + s);
}

function displayTime_seconds(s){
    var h = Math.floor(s/3600);
    s -= h * 3600;
    var m = Math.floor(s/60);
    s -= m * 60;
    displayTime(h, m, s);
}

function disable_Timer(b){
    minutes.disabled = b;
    hours.disabled = b;
    seconds.disabled = b;
}
function timerEnded(){
    if(last_time_started >= 300){
        setTracker();
        study_time_tracker.push([new Date(), last_time_started]);
        localStorage.setItem("study_stats", JSON.stringify(study_time_tracker));
    }
    stopTimer();
    alert("Congratulations!");
}

function startTimer(){
    if(!timerStarted){
        disable_Timer(true);
        timerStarted = true;
        interval = setInterval(function (){
            if(curr_time_seconds == 0){
                timerEnded();
            }
            curr_time_seconds--;
            if(curr_time_seconds < 0){
                curr_time_seconds = 0;
            }
            displayTime_seconds(curr_time_seconds);
        }, 1000);
    }
}

function stopTimer(){
    if(timerStarted){
        timerStarted = false;
        disable_Timer(false);
        clearInterval(interval);
    }
    else{
        alert("Start the timer first!");
    }
}

function resetTimer(){
    if(timerStarted){
        alert("Stop the timer first!");
    }
    else{
        var v = last_time_started - curr_time_seconds;
        if(v >= 300){
            setTracker();
            study_time_tracker.push([new Date(), v]);
            localStorage.setItem("study_stats", JSON.stringify(study_time_tracker));
        }
        curr_time_seconds = last_time_started;
        displayTime_seconds(curr_time_seconds);
    }
}

function clearTimer(){
    if(timerStarted){
        alert("Stop the timer first!");
    }
    else{
        curr_time_seconds = 0;
        displayTime_seconds(curr_time_seconds);
    }
}

hours.addEventListener('change', (e) => {
    if(hours.value > 23 || hours.value < 0){
        alert("Please enter a value between 0 and 23 for hours");
        hours.value = 0;
    }
    else if(hours.value != Math.floor(hours.value)){
        alert("Please enter an integer for hours!");
        hours.value = 0;
    }
    hours.value = hours.value - 0;
});

minutes.addEventListener('change', (e) => {
    if(minutes.value > 59 || minutes.value < 0){
        alert("Please enter a value between 0 and 59 for minutes");
        minutes.value = 0;
    }
    else if(minutes.value != Math.floor(minutes.value)){
        alert("Please enter an integer for minutes!");
        minutes.value = 0;
    }
    minutes.value = minutes.value - 0;
});

seconds.addEventListener('change', (e) => {
    if(seconds.value >= 60 || seconds.value < 0){
        alert("Please enter a value between 0 and 59 for seconds");
        seconds.value = 0;
    }
    else if(seconds.value != Math.floor(seconds.value)){
        alert("Please enter an integer for seconds!");
        seconds.value = 0;
    }
    seconds.value = seconds.value - 0;
});
