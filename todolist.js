var addItem = document.getElementById("add_item");
var toDoListHolder = document.getElementById("todolist_holder");

var items = [];

function addToDo(){
    items.push(addItem.value);
}

function renderList(){
    var toDoList = toDoListHolder.innerHTML;
    for(const item of items){
        toDoList += <li>item</li>;
    }
}