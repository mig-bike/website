var todolist_holder = document.getElementById("todolist_holder");
var addItem = document.getElementById("add_item");

var list_html;

function setListHtml(){
    if (localStorage.getItem("list_html") === null) {
  list_html = "";
} else {
  list_html = JSON.parse(localStorage.getItem("list_html"));
}
}
setListHtml();
renderList();

//render item & save
function addToDo() {
  addElementToList(addItem.value);
  localStorage.setItem("list_html", JSON.stringify(todolist_holder.innerHTML));
}

todolist_holder.addEventListener("click", function (e) {
  var todo_item = e.target.parentElement;
  console.log(todo_item);
  console.log(todo_item.querySelector(".todo_text"));

  if (e.target.id === "delete_button") {
    todo_item.remove();
    localStorage.setItem("list_html", JSON.stringify(todolist_holder.innerHTML));
  } else if (e.target.id === "check_button") {
    e.target.classList.toggle("checked");
    var todo_text = todo_item.querySelector(".todo_text");
    todo_text.classList.toggle("checked");
    localStorage.setItem("list_html", JSON.stringify(todolist_holder.innerHTML));
  }
});

function addElementToList(list_item) {
  var large_div = document.createElement("div");
  large_div.id = "todo_item";
  large_div.className = "todo_item";

  var check_button = document.createElement("div");
  var delete_button = document.createElement("div");
  var todo_text = document.createElement("div");

  check_button.className = "check_button";
  check_button.id = "check_button";
  delete_button.className = "delete_button";
  delete_button.id = "delete_button";
  todo_text.className = "todo_text";

  check_button.innerHTML = ' ';
  delete_button.innerHTML = ' ';
  todo_text.innerHTML = list_item;

  large_div.appendChild(check_button);
  large_div.appendChild(todo_text);
  large_div.appendChild(delete_button);

  todolist_holder.appendChild(large_div);
}

function renderList(){
    setListHtml();
    todolist_holder.innerHTML = list_html;
}