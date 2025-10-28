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

current_deck has three places to store it,

*/
document.addEventListener("DOMContentLoaded", function(){
    render_current_deck();
    let name_elt = document.getElementById("name");
    name_elt.innerHTML = "currently reviewing: " + current_deck.name_of_deck;
}); 

function edit_mode(){
    localStorage.setItem("edit_mode", "true");
    localStorage.setItem("last_deck_clicked", JSON.stringify(index_of_deck));
}

function back(){
    if(current_index != 0){
        current_index--;
    render_current_deck();
    }
    else{
        alert("You are on the first card!");
    }
}

function advance_deck(){
    current_index++;
    render_current_deck();
}

function unlearn_current_card(){
    let current_learning_value = current_deck.deck[current_index][2];
    if(current_learning_value != '0'){
        current_deck.deck[current_index][2] = (--current_deck.deck[current_index][2]).toString();
    }
}
function learn_current_card(){
    let current_learning_value = current_deck.deck[current_index][2];
    if(current_learning_value != '2'){
        current_deck.deck[current_index][2] = (++current_deck.deck[current_index][2]).toString();
    }
}

function test_mode(){
   localStorage.setItem("last_deck_clicked", JSON.stringify(index_of_deck));
}

function dont_got_it(){
    unlearn_current_card();
    advance_deck();
}

function got_it(){
    learn_current_card();
    advance_deck();
}

function finished_reviewing_deck(){
    current_deck.last_time_studied = new Date();
}

function render_current_deck(){
    if(current_index >= current_deck.deck.length){
        current_index = (current_index + current_deck.deck.length) % current_deck.deck.length;
        finished_reviewing_deck();
        alert("Congratulations! You have finished reviewing this deck!")
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