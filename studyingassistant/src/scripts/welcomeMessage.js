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