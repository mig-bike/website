
var deck_array;
var decks_flashcards = document.getElementById("decks_flashcards");

if(localStorage.getItem("deck_of_decks") === null){
  deck_array = [];
}
else{
  deck_array = JSON.parse(localStorage.getItem("deck_of_decks"));
}

render_deck();

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

function makeDeck(title, description, index){
  let deck = document.createElement("div");
  deck.className = "deck";
  deck.id = index;

  let deck_title = document.createElement("div");
  let deck_description = document.createElement("div");
  
  deck_title.className = "flashcard_title"; // maybe we should change this later, works for now
  deck_description.className = "flashcard_description";

  deck_title.innerHTML = title;
  deck_description.innerHTML = description;

  deck.appendChild(deck_title);
  deck.appendChild(deck_description);

  return deck;
}