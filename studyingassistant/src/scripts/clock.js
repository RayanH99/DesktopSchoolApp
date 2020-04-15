//local date and time script
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
    var x3= month+'-'+day+'-'+year;

    // time part //
    var hour=x.getHours();
    var minute=x.getMinutes();
    if(hour <10 ){hour='0'+hour;}
    if(minute <10 ) {minute='0' + minute; }
    var x3 = x3 + ' ' +  hour+':'+minute;
    document.getElementById('clock').innerHTML = x3;
    display_c();
}