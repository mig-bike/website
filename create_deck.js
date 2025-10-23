var name_box = document.getElementById("name_deck");
var description_box = document.getElementById("describe_deck");

var front_of_card = document.getElementById("front_of_card");
var back_of_card = document.getElementById("back_of_cards");

class deck_of_cards {
  constructor(name_of_deck, description, deck){
    this.name_of_deck = name_of_deck;
    this.description = description;
    this.deck = deck;
  }
}
var deck_of_decks;
var current_deck_of_cards = new deck_of_cards();
var current_deck = [];

if(localStorage.get("deck_of_decks") = undefined){
  var deck_of_decks = [];  
}
else{
  var deck_of_decks = localStorage.get("deck_of_decks");
}

function add_card(){
  let front = front_of_card.value;
  let back = back_of_card.value;

  let card = [front, back];
  current_deck.push(card);
}

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
  let current_deck_of_cards = new deck_of_cards(name_box.value, description_box.value, current_deck);
}

function save_deck(){
  if(sessionStorage.getItem("already_saved") != undefined){ //we will check if they already saved a deck, which means we shouldn't push it again
    makeDeck();
    deck_of_decks[JSON.parse(sessionStorage.getItem("already_saved"))] = deck_of_cards;
    //the above should make it so that the deck of decks will replace our old (current) deck with the new stuff they put in / out
  }
  else{
    //push deck
    if(makeDeck() === true){    
      deck_of_decks.push(current_deck_of_cards);
      localStorage.setItem("deck_of_decks", deck_of_decks);
      sessionStorage.setItem("already_saved", JSON.stringify(deck_of_decks.length - 1));
    }
    else{
      alert("Make sure the name, description, and at least one card is filled out!");
    }
  }
}