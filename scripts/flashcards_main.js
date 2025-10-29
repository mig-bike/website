var deck_array;
var decks_flashcards = document.getElementById("decks_flashcards");

var all_decks;

var spaced_rep_array = [0, 1, 6, 16];


document.addEventListener("DOMContentLoaded", function(){

  //tries to pull a deck of decks from local storage
  console.log("hello");
  if(localStorage.getItem("deck_of_decks") === null){
    deck_array = [];
  }
  else{
    deck_array = JSON.parse(localStorage.getItem("deck_of_decks"));
  }

  render_deck();

  all_decks = document.querySelectorAll("a.deck");

  //adds event listeners to set the last deck clicked to a value so we can access it later
  for(var i = 0; i < all_decks.length; i++){
    console.log(i);
    all_decks[i].addEventListener("click", function(e){
      console.log(this.id);
      localStorage.setItem("last_deck_clicked", this.id);
      //sets item in local storage to the last deck clicked, which we will then use to render
      //the following page
    });
  }
}); 


//renders the deck
function render_deck(){
  decks_flashcards.innerHTML = "";
    for(var i = 0; i < deck_array.length; i++){
      let deck = makeDeck(deck_array[i].name_of_deck, deck_array[i].description, i);
      decks_flashcards.appendChild(deck);
    }
}

function unrender_deck(){
  decks_flashcards.innerHTML = "";
}

function getStudyStr(millis){
  console.log("hello");
  console.log(millis);
 var days = Math.floor(millis/(1000 * 60 * 60 * 24));
 millis -= days * 1000 * 60 * 60 *24;
 var hours = Math.floor(millis/(1000 * 60 * 60));
 millis -= hours * 1000 * 60 * 60;
 var minutes = Math.floor(millis/(1000 * 60));
 millis -= minutes * 1000 * 60;
 var seconds = Math.floor(millis/1000);

 return "Time to next study: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s";
}

function makeStudyReminder(index){
  let reminder = document.createElement("div");

  let current_deck_of_cards = deck_array[index];
  console.log(current_deck_of_cards);
  let date_of_last_study = current_deck_of_cards.last_time_studied;
  console.log("date_of_last_study: "+ date_of_last_study);
  let days_since_last_study = (Date.now() - date_of_last_study)/(1000 * 60 * 60 * 24); //gets number of days since
  console.log("hello: " + days_since_last_study);

  let next_review_session = 1000 * 60 * 60 * 24 * (spaced_rep_array[current_deck_of_cards.spaced_repetition_count] - days_since_last_study);
  console.log(next_review_session);
  
  let studyStr;

  reminder.className = "study_reminder";

  if(current_deck_of_cards.spaced_repetition_count <= 3){
    if(next_review_session < 0){
      studyStr = "Study this deck ASAP!";
    }
    else{
      studyStr = getStudyStr(next_review_session);
    }
  }
  else{
    studyStr = "You have sufficiently reviewed this deck!";
  }

  reminder.innerHTML = studyStr;
  
  return reminder;
}

//what each deck looks like
function makeDeck(title, description, index){
  let deck = document.createElement("a");
  deck.href = "review_deck.html"; //sets this up
  deck.className = "deck";
  deck.id = index;

  let deck_title = document.createElement("div");
  let deck_description = document.createElement("div");
  
  deck_title.className = "flashcard_title"; // maybe we should change this later, works for now
  deck_description.className = "flashcard_description";

  deck_title.innerHTML = title;
  deck_description.innerHTML = description;

  let deck_time_since_reviewed = makeStudyReminder(index);

  deck.appendChild(deck_title);
  deck.appendChild(deck_description);
  deck.appendChild(deck_time_since_reviewed);

  return deck;
}