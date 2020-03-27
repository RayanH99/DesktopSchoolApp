var todoItems = ['Task 1', 'Task 2', 'Task 3'];

var submitBtn = document.getElementById("submitBtn");
var todoList = document.getElementById("todolist")

//submit button
submitBtn.addEventListener("click", function() 
{
    var desc = document.getElementById("newTask").value;
    if (desc.length > 0)
    {
        var newItem = document.createElement("li");
        newItem.classList.add("list-group-item");
        newItem.innerHTML = desc;
        //clear input
        document.getElementById("newTask").value = "";
        todoList.appendChild(newItem);
    }
});