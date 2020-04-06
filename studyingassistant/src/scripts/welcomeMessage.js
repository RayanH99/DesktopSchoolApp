require('../scripts/dbConnection');

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

var wordBtn = document.getElementById("wordBtn");
var sheetsBtn = document.getElementById("sheetsBtn");
var pptBtn = document.getElementById("pptBtn");
var portalBtn = document.getElementById("portalBtn");


wordBtn.addEventListener('click', function()
{
    require("electron").shell.openExternal('https://docs.google.com/');
});

sheetsBtn.addEventListener('click', function()
{
    require("electron").shell.openExternal('https://docs.google.com/spreadsheets/u/0/');
});

pptBtn.addEventListener('click', function()
{
    require("electron").shell.openExternal('https://docs.google.com/presentation/u/0/');
});

portalBtn.addEventListener('click', function()
{
    require("electron").shell.openExternal('https://cap.mcmaster.ca/mcauth/login.jsp?app_id=1505&app_name=Avenue');
});


var logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener('click', function()
{
    firebase.auth().signOut()
    .then(function() 
    {
        // Sign-out successful.
        document.location.href = "../pages/loginPage.html";
    })
    .catch(function(error) 
    {
        // An error happened
        if(error)
        {
            notifier.notify(
                {
                  title: 'The Study App',
                  message: error.message,
                  // icon: path.join(__dirname, 'coulson.jpg'),
                  sound: true, // Only Notification Center or Windows Toasters
                  wait: true // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait
                },
                function(err, response) {
                  // Response is response from notification
                }
            );
        }
    });
})