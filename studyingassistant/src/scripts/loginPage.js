//get firebase DB connection
require('../scripts/dbConnection.js');

//notifications
const notifier = require('node-notifier');
const path = require('path'); //going to use this to replace the icon later

var loginBtn = document.getElementById("submitBtn");

loginBtn.addEventListener('click', function()
{
    var emailField = document.getElementById("inputEmail3").value;
    var passField = document.getElementById("inputPassword3").value;
    
    firebase.auth().signInWithEmailAndPassword(emailField, passField)
    .then(function()
    {
        //login
        window.location.href = "../pages/welcomePage.html";
    })
    .catch(function(error) 
    {
        // Handle Errors here
        var errorCode = error.code;
        var errorMessage = error.message;
    })
});