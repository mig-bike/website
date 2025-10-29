var to_do_list = document.getElementById("download_to_do_list");
var timer_stats = document.getElementById("download_timer");
var deck_of_decks = document.getElementById("download_deck_of_decks");
var deck_of_decks_empty = document.getElementById("download_deck_of_decks_empty");
var select_decks = document.getElementById("download_select_decks");

//from https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
if(localStorage.getItem("deck_of_decks") == null){
  localStorage.setItem("deck_of_decks", []);
}
//below is generalizable!!
function download_deck_of_decks(){
  var deck_of_decks_json = "data:text/json;charset=utf-8," + encodeURIComponent(localStorage.getItem("deck_of_decks"));
  deck_of_decks.setAttribute("href", deck_of_decks_json);
  deck_of_decks.setAttribute("download", "hello.json");
}
download_deck_of_decks();