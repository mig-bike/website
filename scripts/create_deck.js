var name_box = document.getElementById("name_deck");
var description_box = document.getElementById("describe_deck");

var front_of_card = document.getElementById("front_of_card");
var back_of_card = document.getElementById("back_of_cards");

var deck_viewer = document.getElementById("deck_viewer");

var deck_is_viewed = false;

var currently_editing = false;

//class for the deck of flashcards, it should have a name, description, and deck

//also we will put some stuff into the learned / unlearned piles
class deck_of_cards {
  constructor(
    name_of_deck,
    description,
    deck,
    learned_cards,
    semi_learned_cards,
    unlearned_cards
  ) {
    this.name_of_deck = name_of_deck;
    this.description = description;
    this.deck = deck;
    this.learned_cards = learned_cards; // completely learned
    this.semi_learned_cards = semi_learned_cards; // kind of learned
    this.unlearned_cards = unlearned_cards; //not learned at all!
  }

  //cool stack overflow workaround for another constructor with only name, description, deck
  static name_description_deck(name_of_deck, description, deck) {
    return new deck_of_cards(name_of_deck, description, deck, [], [], []);
  }
}

// initalizes variables
var deck_of_decks;
var current_deck_of_cards = new deck_of_cards();
var current_deck = [];
var delete_mode;

//sets deck of decks to value if it can get it from local storage
document.addEventListener("DOMContentLoaded", function () {
  delete_mode = false;

  if (localStorage.getItem("edit_mode") != "true") {
  } else {
    let currently_editing_index = localStorage.getItem("last_deck_clicked");
    sessionStorage.setItem("current_deck_index", currently_editing_index);
    localStorage.setItem("edit_mode", "false");
  }
  //sets deck of decks to value if it can get it from local storage
  if (localStorage.getItem("deck_of_decks") === null) {
    deck_of_decks = [];
  } else {
    deck_of_decks = JSON.parse(localStorage.getItem("deck_of_decks"));
  }

  //checks to see if session storage has something in it right now (is this the same deck?)

  if (sessionStorage.getItem("current_deck_index") === null) {
  } else {
    var current_deck_index = JSON.parse(
      sessionStorage.getItem("current_deck_index")
    );
    current_deck_of_cards = deck_of_decks[current_deck_index];
    current_deck = current_deck_of_cards.deck;
    name_box.value = current_deck_of_cards.name_of_deck;
    description_box.value = current_deck_of_cards.description;
    render_cards();
  }
});

//adds a card based on front and back input
function add_card() {
  save_current_cards();

  let front = front_of_card.value;
  let back = back_of_card.value;

  let card = [front, back];
  current_deck.push(card);
  //previously we had if the deck is viewed render cards, but i don't know if it was necessary.
  render_cards();
}

//makes a deck based on the current values (must be filled out), returns false early if not
function makeDeck() {
  if (name_box.value == "") {
    return false;
  }
  if (description_box.value == "") {
    return false;
  }
  if (current_deck.length == 0) {
    return false;
  }
  //saves all the edits made to the deck
  console.log("got it");

  save_current_cards();

  current_deck_of_cards = deck_of_cards.name_description_deck(
    name_box.value,
    description_box.value,
    current_deck
  );
  return true;
}

function save_current_cards() {
  current_deck = [];
  let array_of_flashcards = deck_viewer.children;
  for (var i = 0; i < array_of_flashcards.length; i++) {
    let ith_flashcard = array_of_flashcards[i];
    let front_of_ith_flashcard = ith_flashcard.children[0].innerHTML;
    let back_of_ith_flashcard = ith_flashcard.children[1].innerHTML;
    current_deck.push([front_of_ith_flashcard, back_of_ith_flashcard]);
  }
}

//toggles card viewing
/*
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
  */

function delete_a_card(e){
  if(e.target.parentElement.className === "flashcard delete_card_background"){
        e.target.parentElement.remove();
        //we could do something with .id to save the cards, but for now, this is the best way
        //and it is generalizable.
      }
}

function delete_cards() {
  let array_of_flashcards = deck_viewer.children;
  for (var i = 0; i < current_deck.length; i++) {
      let ith_flashcard = array_of_flashcards[i];
      ith_flashcard.classList.toggle("delete_card_background");
    }

  if(!delete_mode){
    deck_viewer.addEventListener("click", delete_a_card);
  }
  else{
    deck_viewer.removeEventListener("click", delete_a_card);
  }
  
  delete_mode = !delete_mode;
}

//renders cards
function render_cards() {
  deck_viewer.innerHTML = "";
  for (var i = 0; i < current_deck.length; i++) {
    let flashcard = makeFlashcard(current_deck[i][0], current_deck[i][1]);
    deck_viewer.appendChild(flashcard);
  }
}

function unrender_cards() {
  deck_viewer.innerHTML = "";
}

//representation of each flashcard in dom
function makeFlashcard(front, back) {
  let flashcard = document.createElement("div");
  flashcard.className = "flashcard";
  if(delete_mode === true){
    flashcard.classList.toggle("delete_card_background");
  }

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

function edit_deck() {
  for (const flashcard of deck_viewer.children) {
    for (const flashcard_side of flashcard.children) {
      if (currently_editing) {
        flashcard_side.setAttribute("contenteditable", "false");
      } else {
        flashcard_side.setAttribute("contenteditable", "true");
      }
    }
  }
  currently_editing = !currently_editing;
}

//saves the deck to localstorage
/*
- if we already saved the deck in the session, we don't want to make a new deck, so it will just replace it
- if we did not already saved the deck, we do want to make a new deck

user must make a new session to make a new deck
*/
function save_deck() {
  save_current_cards();

  if (sessionStorage.getItem("current_deck_index") != null) {
    //we will check if they already saved a deck, which means we shouldn't push it again
    if (makeDeck() === true) {
      deck_of_decks[JSON.parse(sessionStorage.getItem("current_deck_index"))] =
        current_deck_of_cards;
      localStorage.setItem("deck_of_decks", JSON.stringify(deck_of_decks));
    } else {
      alert(
        "Make sure the name, description, and at least one card is filled out!"
      );
    }
    //the above should make it so that the deck of decks will replace our old (current) deck with the new stuff they put in / out
  } else {
    //push deck
    if (makeDeck() === true) {
      deck_of_decks.push(current_deck_of_cards);
      localStorage.setItem("deck_of_decks", JSON.stringify(deck_of_decks));
      sessionStorage.setItem(
        "current_deck_index",
        JSON.stringify(deck_of_decks.length - 1)
      );
      /*
      above code can be buggy if we are debugging and we clear our local storage but somehow
      the session storage doesn't clear... so fix that
      */
    } else {
      alert(
        "Make sure the name, description, and at least one card is filled out!"
      );
    }
  }
}
