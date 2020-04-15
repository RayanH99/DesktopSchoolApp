//local date and time script
const notifier = require('node-notifier'); //notifications

reminderDate = '2020-04-14';
reminderTime = twentyfourhourTime('11:53 PM');
reminderNotif = reminderDate + ' ' + reminderTime;

//get the 24hour time format for editing functionality
function twentyfourhourTime(timeVal)
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
    return newHour + ':' + oldMin;
}

function display_c()
{
    var refresh=1000; // Refresh rate in milli seconds
    mytime=setTimeout('display_clock()',refresh)
}
    
function display_clock() 
{
    var x = new Date();
    // date part ///
    var month=x.getMonth()+1;
    var day=x.getDate();
    var year=x.getFullYear();
    if (month <10 ){month='0' + month;}
    if (day <10 ){day='0' + day;}
    var x3= year+'-'+month+'-'+day;

    // time part //
    var hour=x.getHours();
    var minute=x.getMinutes();
    if(hour <10 ){hour='0'+hour;}
    if(minute <10 ) {minute='0' + minute; }
    var x3 = x3 + ' ' +  hour+':'+minute;
    document.getElementById('clock').innerHTML = x3;

    if (x3 == reminderNotif)
    {
        notifier.notify(
            {
              title: 'The Study App',
              message: 'ALARMMMMMM',
              // icon: path.join(__dirname, 'coulson.jpg'),
              sound: true, // Only Notification Center or Windows Toasters
              wait: true // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait
            },
            function(err, response) {
              // Response is response from notification
            }
        );
    }

    display_c();
}