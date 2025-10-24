var deck_array;
var decks_flashcards = document.getElementById("decks_flashcards");

var all_decks = document.querySelectorAll("div.deck");


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

  //adds event listeners to set the last deck clicked to a value so we can access it later
  for(var i = 0; i < all_decks.length; i++){
    all_decks[i].addEventListener("click", function(){
      localStorage.setItem("last_deck_clicked", JSON.stringify(all_decks[i].id));
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

  deck.appendChild(deck_title);
  deck.appendChild(deck_description);

  return deck;
}