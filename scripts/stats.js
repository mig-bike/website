var statistics_array;

if(localStorage.getItem("study_stats") === null){
  statistics_array = [];
}
else if(localStorage.getItem("study_stats").indexOf("Y29vbHZhbGlkYXRpb25zdHI=") == -1){
  statistics_array = [];
}
else{
  statistics_array = JSON.parse(localStorage.getItem("study_stats"));
}
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

//adds the time, seconds_to_log, to day_to_log
function log_time_in_map(day_to_log, seconds_to_log) {
  var current_time_in_day = day_to_studyTime.get(day_to_log);
  if (current_time_in_day === undefined) {
    day_to_studyTime.set(day_to_log, seconds_to_log);
  } else {
    day_to_studyTime.set(day_to_log, current_time_in_day + seconds_to_log);
  }
}

function findTimerVariables() {
  let earliest_day = Math.floor(Date.now() / (1000 * 60 * 60 * 24)); //this is by default set to today (look below)
  //ok basically what below does is it goes and fills the map
  //with what we want, days since epoch -> our stuff
  for (var i = 0; i < statistics_array.length; i++) {
    let date_logged = Date.parse(statistics_array[i][0]);
    let time_seconds_logged = statistics_array[i][1];

    //gets days since the epoch, which we will use to fill out our map
    let millis_since_epoch = date_logged;
    let days_since_epoch = Math.floor(
      millis_since_epoch / (1000 * 60 * 60 * 24)
    );


    /*
    this date is so we can work with the gethours, getminutes, getseconds,
    in case there is overflow since the last day
    */
    let date_logged_obj = new Date(date_logged);
    let finished_hours = date_logged_obj.getHours();
    let finished_minutes = date_logged_obj.getMinutes();
    let finished_seconds = date_logged_obj.getSeconds();

    //calculates overflow, implements it
    let seconds_of_current_day =
      finished_hours * 3600 + finished_minutes * 60 + finished_seconds * 1;
    if (seconds_of_current_day < time_seconds_logged) {
      log_time_in_map(days_since_epoch, seconds_of_current_day);
      log_time_in_map(
        days_since_epoch - 1,
        time_seconds_logged - seconds_of_current_day
      );
    } else {
      log_time_in_map(days_since_epoch, time_seconds_logged);
    }

    //lower bound for the earliest day, which we will loop through for total time
    if (i === 0) {
      earliest_day = days_since_epoch - 2;
    }
    total_time += time_seconds_logged;
  }

  //this finds time_today
  let millis_since_epoch = Date.now();
  let days_since_epoch = Math.floor(millis_since_epoch / (1000 * 60 * 60 * 24));

  if(day_to_studyTime.get(days_since_epoch) != undefined){
    time_today = day_to_studyTime.get(days_since_epoch);
  }
  else{
    time_today = 0;
  }

  //study streak
  let current_day = days_since_epoch;
  while (day_to_studyTime.get(current_day) != undefined) {
    streak++;
    current_day--;
  }

  //max time day
  for (var i = earliest_day; i <= days_since_epoch; i++) {
    //console.log("EARLIEST_DAY: " + earliest_day);
    //console.log("CURRENT DAY: " + days_since_epoch);
    if (day_to_studyTime.get(i) != undefined) {
      //console.log("hello");
      max_time_day = Math.max(max_time_day, day_to_studyTime.get(i));
    }
  }

  //time this week

  let day_today = new Date(millis_since_epoch);
  let day_of_week = day_today.getDay();

  for (var i = 0; i <= day_of_week; i++) {
    if (day_to_studyTime.get(days_since_epoch - i) != undefined){
      time_this_week += day_to_studyTime.get(days_since_epoch - i);
    }
  }
}

function findFlashcardVariables(){

}

// gets the html elements by id to display each var
var total_time_html = document.getElementById("total_study_time");
var max_time_day_html = document.getElementById("most_study_time");
var time_this_week_html = document.getElementById("weekly_study_time");
var time_today_html = document.getElementById("daily_study_time");
var streak_html = document.getElementById("study_streak");

document.addEventListener("DOMContentLoaded", function(){
  findTimerVariables();
  total_time_html.innerHTML += total_time + "s";
  max_time_day_html.innerHTML += max_time_day + "s";
  time_this_week_html.innerHTML += time_this_week + "s";
  time_today_html.innerHTML += time_today + "s";
  streak_html.innerHTML += streak != 1 ? streak + " days": streak + " day";


}); 
