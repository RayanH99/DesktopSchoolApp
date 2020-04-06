// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA6ZNfAGfd_Gx-KHkzOisiHZH7FnHlGTaI",
    authDomain: "study-app-65268.firebaseapp.com",
    databaseURL: "https://study-app-65268.firebaseio.com",
    projectId: "study-app-65268",
    storageBucket: "study-app-65268.appspot.com",
    messagingSenderId: "610286816090",
    appId: "1:610286816090:web:30c3b8a261b1666c378163",
    measurementId: "G-9M78YK2ST7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//notifications
const notifier = require('node-notifier');
const path = require('path'); //going to use this to replace the icon later

var signupBtn = document.getElementById("submitBtn");

signupBtn.addEventListener('click', function(){
    var emailField = document.getElementById("inputEmail3").value;
    var passField = document.getElementById("inputPassword3").value;

    firebase.auth().createUserWithEmailAndPassword(emailField, passField)
    .then(function(){
        notifier.notify(
            {
              title: 'The Study App',
              message: 'Account successfully created!',
              // icon: path.join(__dirname, 'coulson.jpg'),
              sound: true, // Only Notification Center or Windows Toasters
              wait: true // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait
            },
            function(err, response) {
              // Response is response from notification
            }
        );
        document.location.href = "../pages/loginPage.html";
    })
    .catch(function(error){
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
    })
});