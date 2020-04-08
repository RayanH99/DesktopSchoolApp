require('../scripts/dbConnection');
var db = firebase.firestore();
const {ipcRenderer} = require('electron');

//notifications
const notifier = require('node-notifier');
const path = require('path'); //going to use this to replace the icon later

var loginBtn = document.getElementById("submitBtn");

loginBtn.addEventListener('click', function()
{
    console.log("clicked");
    var emailField = document.getElementById("inputEmail3").value;
    var passField = document.getElementById("inputPassword3").value;

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function(){
        return firebase.auth().signInWithEmailAndPassword(emailField, passField)
        .then(function()
        {
            var user = firebase.auth().currentUser;

            //send info to backend
            ipcRenderer.send('sendUserInfo', user);

            return window.location = "../pages/mainWindow.html";
        })
        .catch(function(error) 
        {
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
    .catch(function(error)
    {
        console.log(error);
    });
});