

function setTime(){
    var time_minutes = document.getElementById("time_minutes");
    var time_seconds = document.getElementById("time_seconds");
    var time_display = document.getElementById("time_display");
    var seconds = (time_seconds.value >= 10) ? time_seconds.value : ('0' + time_seconds.value);
    time_display.innerHTML = time_minutes.value + ":" + seconds;
}