var deck_of_decks = JSON.parse(localStorage.getItem("deck_of_decks"));

var index_of_deck = JSON.parse(localStorage.getItem("last_deck_clicked"));
var current_deck = deck_of_decks[index_of_deck];

var current_index = 0;

/*

okay, we need to 
1. show deck
2. allow user to go forward / back with necessary buttons

later we should also make it so that they can edit / delete decks

index within deck for card of deck, then we can simply increment / decrement
index and then call the function for the buttons,

but also we need another storage for the don't/got it part things
*/
document.addEventListener("DOMContentLoaded", function(){
    render_current_deck();
}); 

function render_current_deck(){
    if(current_index >= current_deck.length){
        current_index = current_index % current_deck.length;
    }
    
    let deck_holder = document.getElementById("current_deck");
    deck_holder.innerHTML = "";

    let top_flashcard = render_top_flashcard();
    deck_holder.appendChild(top_flashcard);
    
    top_flashcard.addEventListener("click", function(){
        this.classList.toggle('flipped');
    });
}

function render_top_flashcard(){
    let top_flashcard = document.createElement("div");
    top_flashcard.className = "flashcard_animated";

    let flashcard_front = document.createElement("div");
    let flashcard_back = document.createElement("div");
    flashcard_front.className = "flashcard_animated_front";
    flashcard_back.className = "flashcard_animated_back";

    let current_flashcard = current_deck.deck[current_index];

    flashcard_front.innerHTML = current_flashcard[0];
    flashcard_back.innerHTML = current_flashcard[1];

    top_flashcard.appendChild(flashcard_front);
    top_flashcard.appendChild(flashcard_back);

    return top_flashcard;
}