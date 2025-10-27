var todolist_holder = document.getElementById("todolist_holder");

todolist_holder.addEventListener("click", function(e){
    if(e.target.id === "delete_button"){
        e.target.parentElement.remove();
    }
    else if(e.target.id === "check_button"){
        
    }
})