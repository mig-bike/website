var name_box = document.getElementById("name_deck");
var description_box = document.getElementById("describe_deck");

var front_of_card = document.getElementById("front_of_card");
var back_of_card = document.getElementById("back_of_cards");

var deck_viewer = document.getElementById("deck_viewer");

var deck_is_viewed = false;


//class for the deck of flashcards, it should have a name, description, and deck

//also we will put some stuff into the learned / unlearned piles
class deck_of_cards {
  constructor(name_of_deck, description, deck, learned_cards, semi_learned_cards, unlearned_cards){
    this.name_of_deck = name_of_deck;
    this.description = description;
    this.deck = deck;
    this.learned_cards = learned_cards; // completely learned
    this.semi_learned_cards = semi_learned_cards; // kind of learned
    this.unlearned_cards = unlearned_cards; //not learned at all!
  }

  //cool stack overflow workaround for another constructor with only name, description, deck
  static name_description_deck(name_of_deck, description, deck){
    return new deck_of_cards(name_of_deck, description, deck, [], [], []);
  }
}

// initalizes variables
var deck_of_decks;
var current_deck_of_cards = new deck_of_cards();
var current_deck = [];

//sets deck of decks to value if it can get it from local storage
if(localStorage.getItem("deck_of_decks") === null){
  deck_of_decks = [];
}
else{
  deck_of_decks = JSON.parse(localStorage.getItem("deck_of_decks"));
}

//adds a card based on front and back input
function add_card(){
  let front = front_of_card.value;
  let back = back_of_card.value;

  let card = [front, back];
  current_deck.push(card);

  if(deck_is_viewed){
    render_cards();
  }
}

//makes a deck based on the current values (must be filled out), returns false early if not
function makeDeck(){
  if(name_box.value == ""){
    return false;
  }
  if(description_box.value == ""){
    return false;
  }
  if(current_deck == []){
    return false;
  }
  current_deck_of_cards = deck_of_cards.name_description_deck(name_box.value, description_box.value, current_deck);
  return true;
}


//toggles card viewing
function view_cards(){
  if(current_deck.length === 0){
    alert("No cards to render!");
  }
  else{
    if(!deck_is_viewed){
      render_cards();
    }
    else{
      unrender_cards();
    }
    deck_is_viewed = !deck_is_viewed;
  }
}

//renders cards
function render_cards(){
  deck_viewer.innerHTML = "";
    for(var i = 0; i < current_deck.length; i++){
      let flashcard = makeFlashcard(current_deck[i][0], current_deck[i][1]);
      deck_viewer.appendChild(flashcard);
    }
}

function unrender_cards(){
  deck_viewer.innerHTML = "";
}

//representation of each flashcard in dom
function makeFlashcard(front, back){
  let flashcard = document.createElement("div");
  flashcard.className = "flashcard";

  let flashcard_front = document.createElement("div");
  let flashcard_back = document.createElement("div");
  
  flashcard_front.className = "flashcard_front";
  flashcard_back.className = "flashcard_back";

  flashcard_front.innerHTML = front;
  flashcard_back.innerHTML = back;

  flashcard.appendChild(flashcard_front);
  flashcard.appendChild(flashcard_back);

  return flashcard;
}

function edit_deck(){
  for(const flashcard of deck_viewer.children){
    for(const flashcard_side of flashcard.children){
      flashcard_side.setAttribute("contenteditable", "true");
    }
  }
}

//saves the deck to localstorage
/*
- if we already saved the deck in the session, we don't want to make a new deck, so it will just replace it
- if we did not already saved the deck, we do want to make a new deck

user must make a new session to make a new deck
*/
function save_deck(){
  if(sessionStorage.getItem("already_saved") != null){ //we will check if they already saved a deck, which means we shouldn't push it again
    makeDeck();
    deck_of_decks[JSON.parse(sessionStorage.getItem("already_saved"))] = current_deck_of_cards;
    localStorage.setItem("deck_of_decks", JSON.stringify(deck_of_decks));
    //the above should make it so that the deck of decks will replace our old (current) deck with the new stuff they put in / out
  }
  else{
    //push deck
    if(makeDeck() === true){    
      deck_of_decks.push(current_deck_of_cards);
      localStorage.setItem("deck_of_decks", JSON.stringify(deck_of_decks));
      sessionStorage.setItem("already_saved", JSON.stringify(deck_of_decks.length - 1));
    }
    else{
      alert("Make sure the name, description, and at least one card is filled out!");
    }
  }
}
