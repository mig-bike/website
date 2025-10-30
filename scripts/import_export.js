var to_do_list = document.getElementById("download_to_do_list");
var timer_stats = document.getElementById("download_timer");
var deck_of_decks = document.getElementById("download_deck_of_decks");
var deck_of_decks_empty = document.getElementById("download_deck_of_decks_empty");
var select_decks = document.getElementById("export_select_decks");

var export_buttons_holder = document.getElementById("export_buttons_holder");

var import_decks = document.getElementById("decks");
var import_timer = document.getElementById("timer_stats");
var import_todo = document.getElementById("todolist");

//from https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText

var dod_empty;
var dod; //"deck of decks"


document.addEventListener("DOMContentLoaded", function(){
  console.log("hello");
    if(localStorage.getItem("deck_of_decks") === null){
      console.log("set to empty");
      dod = [];
    }
    else if(localStorage.getItem("deck_of_decks").indexOf("\"name_of_deck\":") === -1){
      console.log("set to empty");
      dod = [];
    }
      else{
        console.log("set to nonempty");
       dod = JSON.parse(localStorage.getItem("deck_of_decks"));
    }
    initialize_buttons();
    initialize_select_deck();
});

function make_empty_deck(target_dod){
  let target_deck_of_decks = target_dod; //makes copy of it
  for(var i = 0; i < target_deck_of_decks.length; i++){
    let target_deck = target_deck_of_decks[i];
    for(var j = 0; j < target_deck.deck.length; j++){
      target_deck.deck[j][2] = '0';
    }
    target_deck_of_decks[i] = target_deck;
  }
  return target_deck_of_decks;
}


function initialize_buttons(){
  //will initialize to empty array if it doesn't work
  create_download_button(localStorage.getItem("deck_of_decks"), "all_decks_with_progress", "Download all your decks! (progress saved)");
  create_download_button(localStorage.getItem("study_stats"), "study_timer_stats", "Download your timer statistics!");
  create_download_button(localStorage.getItem("list_html"), "todolist", "Download your to-do list!");
  create_download_button(JSON.stringify(make_empty_deck(dod)), "all_decks_without_progress", "Download all your decks! (progress deleted)");
}

//from https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
function create_download_button(data_to_download, name_of_download, button_name){
  if(data_to_download != null){
    let link_element = create_export_button(button_name);
    let data_to_page = "data:text/json;charset=utf-8," + encodeURIComponent(data_to_download);
    link_element.setAttribute("href", data_to_page);
    link_element.setAttribute("download", name_of_download + ".json");
    export_buttons_holder.appendChild(link_element);
  }
}

function create_export_button(button_name){
  let outer_link = document.createElement("a");
  outer_link.className = "export_link";

  let inner_button = document.createElement("button");
  inner_button.innerHTML = button_name;
  inner_button.className = "export_button";

  outer_link.appendChild(inner_button);
  return outer_link;
}

function submit_file(file_holder, file_dest){
  let file = file_holder.files[0];
  let file_contents;

  if(file == undefined){
    alert("Attatch a valid file!")
  }
  else{
    const reader = new FileReader();
    reader.readAsText(file);

    reader.addEventListener("load", function(){
      file_contents = reader.result;
      localStorage.setItem(file_dest, file_contents);
    })
  }
}

function submit_decks(){
  submit_file(import_decks, "deck_of_decks");
}

function submit_stats(){
  submit_file(import_timer, "study_stats");
}

function submit_todo(){
  submit_file(import_todo, "todo_html");
}