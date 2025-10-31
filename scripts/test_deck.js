var unlearned_button = document.getElementById("learned");
var partial_button = document.getElementById("partial");
var all_flashcards_button = document.getElementById("all");
var options_holder = document.getElementById("options_holder");
var test_holder = document.getElementById("test_holder");
var checkbox_labels = document.getElementById("checkbox_label_holder");

var current_modes = [];
var spaced_rep_array = [0,1,6,16];

var deck_of_decks;

current_modes.push('');

if (localStorage.getItem("deck_of_decks") === null) {
    deck_of_decks = [];
  } 
  else if(localStorage.getItem("deck_of_decks").indexOf("\"name_of_deck\":") === -1){
    deck_of_decks = [];
  }
  else {
    deck_of_decks = JSON.parse(localStorage.getItem("deck_of_decks"));
  }

var current_index_of_deck = JSON.parse(
  localStorage.getItem("last_deck_clicked")
);
var current_deck_of_cards = deck_of_decks[current_index_of_deck];
var current_deck = current_deck_of_cards.deck;
var reviewed = false;

var submitted = false;

var indices_unlearned = [];
var unlearned_cards = [];

function make_test() {
  if (checkInputs()) {
    findModes();
    clearHTML();
    createTest();
  } else {
    alert("Make sure that at exactly one checkbox per row is filled!");
  }
}

function createTest() {
  if(current_modes[1] == "unlearned"){ //the current mode is unlearned ONLY!
    for(var i = 0; i < current_deck.length; i++){
      if(current_deck[i][2] == 0){
        indices_unlearned.push(i);
        unlearned_cards.push(current_deck[i]);
      }
    }
    current_deck = unlearned_cards; //we will review only the completely unlearned cards
    if(unlearned_cards.length == 0){
      alert("There are no unlearned cards!");
    }
  }
  else if(current_modes[1] == "partial"){
    for(var i = 0; i < current_deck.length; i++){
      if(current_deck[i][2] == 0 || current_deck[i][2] == 1){ //we review unlearned / partially learned cards
        indices_unlearned.push(i); 
        unlearned_cards.push(current_deck[i]);
      }
    }
    current_deck = unlearned_cards; //we will operate only on the completely unlearned cards
    if(unlearned_cards.length == 0){
      alert("There are no unlearned cards!");
    }
  }
  for (var i = 0; i < current_deck.length; i++) {
    let test_question = createTestQuestion(i);
    test_holder.appendChild(test_question);
  }
  let submit_button = document.createElement("button");
  submit_button.className = "submit_button";
  submit_button.id = "submit_button";
  submit_button.setAttribute("onclick", "finish_test();");
  submit_button.innerHTML = "Submit!";

  test_holder.appendChild(submit_button);
}

function createTestQuestion(i) {
  let card = current_deck[i];
  let test_question = document.createElement("li");
  let front_of_card = document.createElement("div");
  let input_area = document.createElement("input");

  test_question.className = "test_item";

  front_of_card.className = "prompt_to_test";
  front_of_card.innerHTML = card[0]; //returns front of card
  front_of_card.id = i;

  input_area.type = "text";
  input_area.placeholder = "Type your answer here!";
  input_area.className = "text_enter_field";
  input_area.id = i;

  test_question.appendChild(front_of_card);
  test_question.appendChild(input_area);

  return test_question;
}

function clearHTML() {
  options_holder.innerHTML = "";
}

function findModes() {
  if (unlearned_button.checked) {
    current_modes.push("unlearned");
  } else if(partial_button.checked){
    current_modes.push("partial");
  }
  else {
    current_modes.push("learned");
  }
}

function getSpacedRepetition(){
    let time_since_last_study = Date.now() - current_deck_of_cards.last_time_studied;
    time_since_last_study /= (1000 * 60 * 60 * 24); //to convert millis to days
    let spaced_rep_threshold = spaced_rep_array[current_deck_of_cards.spaced_repetition_count];

    if(time_since_last_study >= spaced_rep_threshold){
        return true;
    }
    return false;
}

function getMinStudyLevel(){
    let minStudyLevel = 2;
    for(var i = 0; i < current_deck_of_cards.deck.length; i++){
        if(current_deck_of_cards.deck[i][2] == '0'){
            return 0;
        }
        else if(current_deck_of_cards.deck[i][2] == '1'){
            minStudyLevel = 1;
        }
    }
    return minStudyLevel;
}

function finish_test() {
  if (!submitted) {
    submitted = true;

    let input_fields = document.querySelectorAll("input");
    for (var i = 0; i < input_fields.length; i++) {
      input_fields[i].disabled = true; //disable all inputs
    }

    //we should show the answer and then allow them to choose correct/incorrect
    let front_of_card_text = document.querySelectorAll(".prompt_to_test");
    for (var i = 0; i < front_of_card_text.length; i++) {
      front_of_card_text[i].innerHTML = "Answer: " + current_deck[i][1];
    }

    let all_test_items = document.querySelectorAll(".test_item");
    for (var i = 0; i < all_test_items.length; i++) {
      let buttons = createButtons(i);
      all_test_items[i].appendChild(buttons);
    }
    checkbox_labels.classList.toggle("unhide");
    let submit_button = document.getElementById("submit_button");

    submit_button.innerHTML = ("Finish reviewing!"); //changes the submit button to a review button
  } 
  else if(!reviewed){
    review_test();
    if(reviewed){
      alert("Values updated!");
    }
  }
  else {
    alert("Values are already updated!");
  }
}

function review_test(){
  if(valid_submit_inputs()){
    let correct_answers = document.querySelectorAll(".correct_button");

    if(current_modes[1] == "learned"){
      for(var i = 0; i < correct_answers.length; i++){
        console.log("hello");
        if(correct_answers[i].checked){ //if they have a correct answer
          if(current_deck[i][2] == '0' || current_deck[i][2] == '1'){
            current_deck[i][2] = (++current_deck[i][2]).toString(); //learned value increase
          }
        }
        else{ //they must have an incorrect answer
          if(current_deck[i][2] == '1' || current_deck[i][2] == '2'){
            current_deck[i][2] = (--current_deck[i][2]).toString(); //learned value decrease
          }
        }
      }
      current_deck_of_cards.deck = current_deck;
      deck_of_decks[current_index_of_deck] = current_deck_of_cards;

      if(current_deck_of_cards.spaced_repetition_count < 3){
        if(getMinStudyLevel() >= 1){
          if(getSpacedRepetition() == true){
              current_deck_of_cards.last_time_studied = Date.now();
              current_deck_of_cards.spaced_repetition_count++;
          }
        }
      }

      localStorage.setItem("deck_of_decks", JSON.stringify(deck_of_decks));
      reviewed = true;
    }
    else{
      let updated_deck = current_deck_of_cards.deck;
      for(var i = 0; i < unlearned_cards.length; i++){
        if(correct_answers[i].checked){
          updated_deck[indices_unlearned[i]][2] = (++updated_deck[indices_unlearned[i]][2]).toString(); //updated_deck[indices_unlearned[i]] corresponds to the ith unlearned card
        }//we always++ because we have an unlearned card.
        else{
          if(updated_deck[indices_unlearned[i]][2] == '1'){
            updated_deck[indices_unlearned[i]][2] = (--updated_deck[indices_unlearned[i]][2]).toString();
          }
        }
      }
      current_deck_of_cards.deck = updated_deck;
      deck_of_decks[current_index_of_deck] = current_deck_of_cards;
      if(current_deck_of_cards.spaced_repetition_count < 3){
        if(getMinStudyLevel() >= 1){
          if(getSpacedRepetition() == true){
              current_deck_of_cards.last_time_studied = Date.now();
              current_deck_of_cards.spaced_repetition_count++;
          }
        }
      }

      current_deck_of_cards.studied_count++;

      localStorage.setItem("deck_of_decks", JSON.stringify(deck_of_decks));
      reviewed = true;
    }
  }
  else{
    alert("Make sure that there is exactly one checkbox marked per row!");
  }
}

function valid_submit_inputs(){
  let correct_answers = document.querySelectorAll(".correct_button");
  let incorrect_answers = document.querySelectorAll(".incorrect_button");
  for(var i = 0; i < correct_answers.length; i++){
    if(correct_answers[i].checked && incorrect_answers[i].checked){
      return false;
    }
    else if((!correct_answers[i].checked) &&(!incorrect_answers[i].checked)){
      return false;
    }
  }
  return true;
}

function createButtons(index_of_card) {
  let holder = document.createElement("div");
  let button_correct = document.createElement("input");
  let button_incorrect = document.createElement("input");

  holder.className = "right_wrong_holder";

  button_correct.type = "checkbox";
  button_incorrect.type = "checkbox";

  button_correct.className = "correct_button";
  button_incorrect.className = "incorrect_button";

  button_correct.id = index_of_card;
  button_incorrect.id = index_of_card;

  holder.appendChild(button_correct);
  holder.appendChild(button_incorrect);

  return holder;
}

function checkInputs() {
  let number_of_checks = 0;

  if(unlearned_button.checked){
    number_of_checks++;
  }
  if(partial_button.checked){
    number_of_checks++;
  }
  if(all_flashcards_button.checked){
    number_of_checks++;
  }
  if(number_of_checks != 1){
    return false;
  }

  return true;
}
