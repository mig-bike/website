var mcq_button = document.getElementById("mcq");
var frq_button = document.getElementById("frq");
var unlearned_button = document.getElementById("learned");
var all_flashcards_button = document.getElementById("all");
var options_holder = document.getElementById("options_holder")

var current_modes = [];

function make_test(){
  if(checkInputs()){
    findModes();
    clearHTML();
  }
  else{
    alert("Make sure that at exactly one checkbox per row is filled!");
  }
}

/*
function disable_buttons(){
  mcq_button.disabled = true;
  frq_button.disabled = true;
  unlearned_button.disabled = true;
  all_flashcards_button.disabled = true;
}
  */

function clearHTML(){
  options_holder.innerHTML ='';
}

function findModes(){
  if(mcq_button.checked){
    current_modes.push("mcq");
  }
  else{
    current_modes.push("frq");
  }

  if(unlearned_button.checked){
    current_modes.push("unlearned");
  }
  else{
    current_modes.push("learned");
  }
}

function checkInputs(){
  if(mcq_button.checked && frq_button.checked){
    return false;
  }
  if((!mcq_button.checked) && (!frq_button.checked)){
    return false;
  }
  if(unlearned_button.checked && all_flashcards_button.checked){
    return false;
  }
  if((!unlearned_button.checked) && (!all_flashcards_button.checked)){
    return false;
  }
  
  return true;
}