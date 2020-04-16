//local date and time script
const notifier = require('node-notifier'); //notifications
var notifs = []; //store all reminder notifications in here

//connect to DB

//pull reminders hashtable

//loop through hashtable and apply getAlarm() to each

//create notif from reminder DB
function getAlarm(date, time, desc)
{
    reminderDate = date;
    reminderTime = convertTime(time);
    reminderNotif = reminderDate + ' ' + reminderTime;
    notifs.push([reminderNotif, desc]);
}

//get the 24hour time format for comparing with local time
function convertTime(timeVal)
{
    var oldTime = timeVal.split(':');
    var oldHour = oldTime[0];
    var oldMin = oldTime[1].slice(0,2);
    var newHour;
    if (timeVal.slice(-2) == "PM")
    {
        newHour = parseInt(oldHour) + 12;
    }
    else
    {
        newHour = oldHour;
    }
    return newHour + ':' + oldMin + ':00';
}

function display_c()
{
    var refresh = 1000; //refresh every second
    mytime = setTimeout('display_clock()',refresh)
}
    
function display_clock() 
{
    var x = new Date();
    //format date part
    var month=x.getMonth()+1;
    var day=x.getDate();
    var year=x.getFullYear();
    if (month <10 ){month='0' + month;}
    if (day <10 ){day='0' + day;}
    var x3= year+'-'+month+'-'+day;

    //format time part
    var hour=x.getHours();
    var minute=x.getMinutes();
    var second=x.getSeconds();
    if(hour <10 ){hour='0'+hour;}
    if(minute <10 ) {minute='0' + minute; }
    if(second<10){second='0' + second;}
    var x3 = x3 + ' ' +  hour+':'+minute+':'+second

    document.getElementById('clock').innerHTML = x3;

    for (reminder in notifs)
    {
        if (x3 == reminder)
        {
            notifier.notify(
            {
                title: 'The Study App',
                message: reminder[1], //extract message from reminder
                //icon: path.join(__dirname, 'coulson.jpg'),
                sound: true,
                wait: true
            },
            function(err, response) 
            {
                console.log(err); //Response is response from notification
            });
        }
    }

    display_c(); //refresh clock
}