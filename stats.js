var statistics_array = JSON.parse(localStorage.getItem("study_stats"));

/*
we want to store stuff into an array, and ideally we should have an
'earliest date' for the study timer, and then the 'last date'
in order to be able to plot it later.
*/
var total_time = 0;
var max_time_day = 0;
var time_this_week = 0;
var time_today = 0;
var streak = 0;

var day_to_studyTime = new Map();

function log_time_in_map(day_to_log, seconds_to_log){
  var current_time_in_day = day_to_studyTime.get(day_to_log);
  if(current_time_in_day === undefined){
    day_to_studyTime.set(day_to_log, seconds_to_log);
  }
  else{
    day_to_studyTime.set(day_to_log, current_time_in_day + seconds_to_log);
  }
}

function findVariables(){
  for(var i = 0; i < statistics_array.length; i++){
    let date_logged = statistics_array[i][0];
    let time_seconds_logged = statistics_array[i][1];

    let millis_since_epoch = date_logged.now();
    let days_since_epoch = Math.floor(millis_since_epoch / (1000 * 60 * 60 * 24));
    
    let finished_hours = date_logged.getHours();
    let finished_minutes = date_logged.getMinutes();
    let finished_seconds = date_logged.getSeconds();

    let seconds_of_current_day = finished_hours * 3600 + finished_minutes * 60 + finished_seconds * 1;
    if(seconds_of_current_day < time_seconds_logged){
      log_time_in_map(days_since_epoch, seconds_of_current_day);
      log_time_in_map(days_since_epoch - 1, time_seconds_logged - seconds_of_current_day);
    }
    else{
      log_time_in_map(days_since_epoch, time_seconds_logged);
    }
    total_time += time_seconds_logged;
  }

  var today = new Date();
  let millis_since_epoch = today.now();
  let days_since_epoch = Math.floor(millis_since_epoch / (1000 * 60 * 60 * 24));

  time_today = day_to_studyTime(days_since_epoch);
}