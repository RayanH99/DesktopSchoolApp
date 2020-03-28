var todoItems = ['Task 2', 'Task 3', 'Task 4'];

var submitBtn = document.getElementById("submitBtn");
var todoList = document.getElementById("todolist");

//load tasks

for (let task = 0; task < todoItems.length; task++)
{
    var newItem = document.createElement("li");
    newItem.classList.add("list-group-item");
    newItem.innerHTML = todoItems[task];
    todoList.appendChild(newItem);
}

//submit button
submitBtn.addEventListener("click" ,function () 
{
    var desc = document.getElementById("newTask").value;
    var dateVal = document.getElementById("date").value;
    var timeVal = document.getElementById("time").value;

    if (desc.length > 0)
    {
        //create list item
        var newItem = document.createElement("li");
        newItem.classList.add("list-group-item");
        newItem.innerHTML = desc;

        //create button
        var btnDrop = document.createElement("button");
        btnDrop.classList.add("btn");
        btnDrop.classList.add("btn-outline-warning");
        btnDrop.classList.add("moreInfo");
        btnDrop.setAttribute("type", "button");
        btnDrop.setAttribute("data-toggle","collapse");
        btnDrop.setAttribute("data-target", "#collapseExample");
        btnDrop.setAttribute("aria-expanded", "false");
        btnDrop.setAttribute("aria-controls", "collapseExample");
        btnDrop.setAttribute("onclick", "submit()");
        btnDrop.innerHTML = "➕";
        newItem.appendChild(btnDrop);

        //create drop down div
        var moreInfoTab = document.createElement("div");
        moreInfoTab.classList.add("collapse");
        moreInfoTab.id = "collapseExample";
        
        //create body of the div
        var infoCard = document.createElement("div");
        infoCard.classList.add("card");
        infoCard.classList.add("card-body");
        var newDate = document.createElement("p");
        newDate.innerHTML = dateVal;
        var newTime = document.createElement("p");
        newTime.innerHTML = timeVal;
        infoCard.appendChild(newDate);
        infoCard.appendChild(newTime);
        moreInfoTab.appendChild(infoCard);

        //clear input
        document.getElementById("newTask").value = "";
        todoList.appendChild(newItem);
        todoList.appendChild(moreInfoTab);
    }
});