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
var currently_pomodoro = false;
var pomodoro_value;
var time_of_break;
var time_of_study;
var currently_on_break = false;

var number_of_pomodoros = 0;
/*
pomodoro timer should:
1. set the time to correct amount
2. set a timer ("time to break") after the timer expires
3. repeat this process for a set number of times, upon which a "big break" is triggered
4. repeat this whole process until the user stops it.
*/

function setTracker(){
    if(localStorage.getItem("study_stats") === null){
        study_time_tracker = [];
    }
    else if(localStorage.getItem("study_stats").indexOf("Y29vbHZhbGlkYXRpb25zdHI") == -1){
        study_time_tracker = [];
    }
    else{
        study_time_tracker = JSON.parse(localStorage.getItem("study_stats"));
    }
}

time_input.addEventListener('change', (e) =>{
    setTime();
});

function disable_pomodoro(){
    currently_pomodoro = false;
    currently_on_break = false;

    number_of_pomodoros = 0;
    if(!timerStarted){
        disable_Timer(false);
    }
}

function pomodoro1(){
    pomodoro_set(25, 5, 1); //sets time_to_study, time_to_break, pomodoro_type respectively
}

function pomodoro2(){
    pomodoro_set(12, 3, 0); //sets time_to_study, time_to_break, pomodoro_type respectively
    //0 pomodoro type indicates there is no 'big break'.
}

function pomodoro_set(time_to_study, time_to_break, pomodoro_type){
    //sets time and disables timer, waiting for user to start.
    currently_on_break = false; //this should be initially false for a pomodoro.
    number_of_pomodoros = 0; //set it back to zero

    time_of_study = time_to_study;
    currently_pomodoro = true;
    pomodoro_value = pomodoro_type;
    time_of_break = time_to_break;

    setPomodoroTime();
}

function setPomodoroTime(){
    //if not currently on break, set the minutes value to the study time.
    if(!currently_on_break){
        number_of_pomodoros++;
        pomodoroTime(time_of_study);
    }
    else{
        if(number_of_pomodoros % 4 == 0 && pomodoro_value == 1){ //every four pomodoros, do a big break;
            pomodoroTime(time_of_break * 2);
        }
        else if(number_of_pomodoros % 2 == 0 && pomodoro_value == 2){//for long study sessions, big break every two
            pomodoroTime(time_of_break * 2);
        }
        else{
            pomodoroTime(time_of_break);
        }
    }
    //alternate it; the next time should be a break.
    currently_on_break = !currently_on_break;
}

function pomodoroTime(time_to_use){
    minutes.value = time_to_use;
    disable_Timer(true);
    setTime();
    startTimer();
}  

function setTime(){
    hours.value -= 0; minutes.value -= 0; seconds.value -= 0; //removes leading zeros
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

//enables/disables input

function disable_Timer(b){
    minutes.disabled = b;
    hours.disabled = b;
    seconds.disabled = b;
}

//tracks time if timer ends
function timerEnded(){
        setTracker();
        if((!currently_on_break && !currently_pomodoro) || (currently_on_break && currently_pomodoro)){
            study_time_tracker.push([new Date(), last_time_started, "Y29vbHZhbGlkYXRpb25zdHI="]);
        }
        localStorage.setItem("study_stats", JSON.stringify(study_time_tracker));
    stopTimer();
    alert("Congratulations!");
    if(currently_pomodoro){
        setPomodoroTime();
    }
}


//starts the timer
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

//stops the timer, and enables inputs into the timer again
function stopTimer(){
    if(timerStarted){
        timerStarted = false;
        if(!currently_pomodoro){
            disable_Timer(false);
        }
        clearInterval(interval);
    }
    else{
        alert("Start the timer first!");
    }
}

//resets timer back to last set time, if timer is stopped
function resetTimer(){
    if(timerStarted){
        alert("Stop the timer first!");
    }
    else{
        var v = last_time_started - curr_time_seconds;
            setTracker();
            if((!currently_on_break && !currently_pomodoro) || (currently_on_break && currently_pomodoro)){
                study_time_tracker.push([new Date(), v, "Y29vbHZhbGlkYXRpb25zdHI="]);
            }
            localStorage.setItem("study_stats", JSON.stringify(study_time_tracker));
        curr_time_seconds = last_time_started;
        displayTime_seconds(curr_time_seconds);
    }
}
//clears timer, only if the timer is stopped
function clearTimer(){
    if(timerStarted){
        alert("Stop the timer first!");
    }
    else{
        curr_time_seconds = 0;
        displayTime_seconds(curr_time_seconds);
    }
}
//below is just verification to make sure that each one of the timer inputs are valid
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