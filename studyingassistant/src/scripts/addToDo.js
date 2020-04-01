var todoItems = [
    Task1 = {
        Desc: "Task 1",
        Date: "2020-03-28",
        Time: "06:53 PM",
        ItemID: "newItem1"
    },
    Task2 = {
        Desc: "Task 2",
        Date: "2020-03-29",
        Time: "07:02 AM",
        ItemID: "newItem2"
    }
];

var submitBtn = document.getElementById("submitBtn");
var todoList = document.getElementById("todolist");

var numItems = todoItems.length;
var newTime = "";
var inputEle = document.getElementById('time');

//load tasks
for (let task = 0; task < todoItems.length; task++)
{
    var newID = todoItems[task].ItemID; 
    var desc = todoItems[task].Desc; 
    var dateVal = todoItems[task].Date; 
    var timeVal = todoItems[task].Time; 
    createTask(newID, desc, dateVal, timeVal);
}

//submit button
submitBtn.addEventListener("click" ,function () 
{
    numItems++; //increase item count
    newID = "newItem" + numItems; //creates new ID for element
    var desc = document.getElementById("newTask").value;
    var dateVal = document.getElementById("date").value;
    var timeVal = onTimeChange();

    if (desc.length > 0)
    {
        createTask(newID, desc, dateVal, timeVal);
        //add to database
        todoItems.push({Desc: desc, Date: dateVal, Time: timeVal, ItemID: newID});
        //clear input
        document.getElementById("newTask").value = "";
        document.getElementById("date").value = "";
        document.getElementById("time").value = "";
    }
    else
    {
        //**********app seems to stop working correctly here**********
        alert("Please fill out all required fields.");
    }
});


//get 12 hour format time
function onTimeChange() 
{
    var timeSplit = inputEle.value.split(':'),
        hours,
        minutes,
        meridian;
        hours = timeSplit[0];
        minutes = timeSplit[1];
    if (hours > 12) 
    {
      meridian = 'PM';
      hours -= 12;
    } 
    else if (hours < 12) 
    {
        meridian = 'AM';
        if (hours == 0) 
        {
            hours = 12;
        }
    } 
    else 
    {
        meridian = 'PM';
    }
    return newTime = hours + ':' + minutes + ' ' + meridian;
}

//construct html card
function createTask(newID, desc, dateVal, timeVal)
{
    //create list item
    var newItem = document.createElement("li");
    newItem.classList.add("list-group-item");

    //create delete button
    var btnDelete = document.createElement("button");
    btnDelete.classList.add("deleteBtn");
    btnDelete.id = "delete" + newID;
    btnDelete.innerHTML = "🗑";
    newItem.appendChild(btnDelete);

    //create edit button
    var btnEdit = document.createElement("button");
    btnEdit.classList.add("editBtn");
    btnEdit.id = "edit" + newID;
    btnEdit.innerHTML = "✏";
    newItem.appendChild(btnEdit);

    //create more info button
    var btnDrop = document.createElement("button");
    btnDrop.classList.add("moreInfo");
    btnDrop.setAttribute("type", "button");
    btnDrop.setAttribute("data-toggle","collapse");
    btnDrop.setAttribute("data-target", "#" + newID);
    btnDrop.setAttribute("aria-expanded", "false");
    btnDrop.setAttribute("aria-controls", newID);
    btnDrop.innerHTML = desc;
    newItem.appendChild(btnDrop);

    //create drop down div
    var moreInfoTab = document.createElement("div");
    moreInfoTab.classList.add("collapse");
    moreInfoTab.id = newID;
    
    //create body of the div
    var infoCard = document.createElement("div");
    infoCard.classList.add("card");
    infoCard.classList.add("card-body");
    var newDate = document.createElement("p");
    newDate.innerHTML = "Date: " + dateVal;
    var newTime = document.createElement("p");
    newTime.innerHTML = "Time: " + timeVal;
    infoCard.appendChild(newDate);
    infoCard.appendChild(newTime);
    moreInfoTab.appendChild(infoCard);

    //add to list
    todoList.appendChild(newItem);
    todoList.appendChild(moreInfoTab);

    //deleting a todo
    $("#delete"+newID).on("click", function(e) 
    {
        //search for task in list and delete
        for (let task=0; task<todoItems.length; task++)
        {
            if (todoItems[task].ItemID == newID)
            {
                todoItems.splice(task, 1);
            }
        }
        //reassign IDs
        
        //hide elements from display
        $(this).parent().fadeOut(100,function()
        {
            $("#"+newID).remove();
            $(this).remove();
        });
        e.stopPropagation();
    });

    //updating a todo
    $("#edit"+newID).on("click", function(e) 
    {
        //search for task in list and delete
        for (let task=0; task<todoItems.length; task++)
        {
            //load values into form
            if (todoItems[task].ItemID == newID)
            {
                console.log(todoItems[task]);
                document.getElementById("newTask").value = todoItems[task].Desc;
                document.getElementById("date").value = todoItems[task].Date;
                document.getElementById("time").value = todoItems[task].Time;
            }
        }
    });
}