var myDate = new Date();
var hrs = myDate.getHours();
var greet;
var welcomeMsg = document.getElementById('heading');

if (hrs < 12)
    greet = 'Good Morning';
else if (hrs >= 12 && hrs <= 17)
    greet = 'Good Afternoon';
else if (hrs >= 17 && hrs <= 24)
    greet = 'Good Evening';

welcomeMsg.innerHTML = greet + ', Corona! 👋';