require('../scripts/dbConnection');
var db = firebase.firestore();
var emailVal = "";

const {ipcRenderer} = require('electron');

//request user info from backend
ipcRenderer.invoke('getUser')
.then((result) => 
{
    emailVal = result.currName;
    //search for username via email address from the firebase cloud storage
    var username = db.collection("users").doc(emailVal);
    username.get()
    .then(function(doc) 
    {
        if (doc.exists) 
            welcomeMsg.innerHTML = greet + ', ' +doc.data().name+ ' 👋';
        else
            console.log("No such document!");
    })
    .catch(function(error) 
    {
        console.log("Error getting document:", error);
    });
});

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

var wordBtn = document.getElementById("wordBtn");
var sheetsBtn = document.getElementById("sheetsBtn");
var pptBtn = document.getElementById("pptBtn");
var portalBtn = document.getElementById("portalBtn");
var settings = document.getElementById("settingsBtn");


//bottom docker shortcuts
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

settingsBtn.addEventListener('click', () => {
    createBrowserWindow();
});

// create settings window
function createBrowserWindow() {
    const remote = require('electron').remote;
    const url = require('url');
    const path = require('path');
    const BrowserWindow = remote.BrowserWindow;
    const win = new BrowserWindow({
        width:600, 
        height:540, 
        webPreferences: {nodeIntegration: true}
    });
  
    win.loadURL(url.format({
        pathname: path.join(__dirname, '../pages/settingsPage.html'),
        protocol: 'file:', 
        slashes: true
    }));
}

//logout functionality ********need to clear info from backend storage as well so no info is saved
var logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener('click', function()
{
    ipcRenderer.invoke('logoutUser');
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