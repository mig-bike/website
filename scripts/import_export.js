var to_do_list = document.getElementById("download_to_do_list");
var timer_stats = document.getElementById("download_timer");
var deck_of_decks = document.getElementById("download_deck_of_decks");
var deck_of_decks_empty = document.getElementById("download_deck_of_decks_empty");
var select_decks = document.getElementById("download_select_decks");

var export_buttons_holder = document.getElementById("export_buttons_holder");

initialize_buttons();

function initialize_buttons(){
  //will initialize to empty array if it doesn't work
  create_download_button(localStorage.getItem("deck_of_decks"), "all_decks_with_progress", "Download all your decks! (progress saved)");
  create_download_button(localStorage.getItem("study_stats"), "study_timer_stats", "Download your timer statistics!");
  create_download_button(localStorage.getItem("list_html"), "todolist", "Download your to-do list!");
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
