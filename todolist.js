var addItem = document.getElementById("add_item");
var toDoListHolder = document.getElementById("todolist_holder");

var items;

if(localStorage.getItem("to_do_list") === null){
    items = [];
}
else{
    items = JSON.parse(localStorage.getItem("to_do_list"));
}
renderList();

//push item, save to local storage, and render
function addToDo(){
    items.push(addItem.value);
    localStorage.setItem("to_do_list", JSON.stringify(items));
    renderList();
}

function renderList(){
    toDoListHolder.innerHTML = '';
    for(var i = 0; i < items.length; i++){
        let list_element = document.createElement("li");
        list_element.textContent = items[i];
        toDoListHolder.appendChild(list_element);
    }
}