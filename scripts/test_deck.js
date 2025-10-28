var mcq_button = document.getElementById("mcq");
var frq_button = document.getElementById("frq");
var unlearned_button = document.getElementById("learned");
var all_flashcards_button = document.getElementById("all");
var options_holder = document.getElementById("options_holder");
var test_holder = document.getElementById("test_holder");
var checkbox_labels = document.getElementById("checkbox_label_holder");

var current_modes = [];
var deck_of_decks = JSON.parse(localStorage.getItem("deck_of_decks"));
var current_index_of_deck = JSON.parse(
  localStorage.getItem("last_deck_clicked")
);
var current_deck_of_cards = deck_of_decks[current_index_of_deck];
var current_deck = current_deck_of_cards.deck;

var submitted = false;

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
  for (var i = 0; i < current_deck.length; i++) {
    let test_question = createTestQuestion(i);
    test_holder.appendChild(test_question);
  }
  let submit_button = document.createElement("button");
  submit_button.class = "submit_button";
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
  if (mcq_button.checked) {
    current_modes.push("mcq");
  } else {
    current_modes.push("frq");
  }

  if (unlearned_button.checked) {
    current_modes.push("unlearned");
  } else {
    current_modes.push("learned");
  }
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

  } else {
    alert("You have already submitted the test!");
  }
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
  if (mcq_button.checked && frq_button.checked) {
    return false;
  }
  if (!mcq_button.checked && !frq_button.checked) {
    return false;
  }
  if (unlearned_button.checked && all_flashcards_button.checked) {
    return false;
  }
  if (!unlearned_button.checked && !all_flashcards_button.checked) {
    return false;
  }

  return true;
}
