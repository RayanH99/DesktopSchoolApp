// manage app settings 
require('../scripts/dbConnection');
var db = firebase.firestore();
const {ipcRenderer} = require('electron');
var Chart = require('chart.js');

// request user info from backend
let username;
let emailVal;

ipcRenderer.invoke('getUser')
.then((result) => {
    emailVal = result.currName;
    //search for username via email address from the firebase cloud storage
    return username = db.collection("users").doc(emailVal);
})
.then (username => {
    return username.get()
})
.then(function(doc) {
    if (doc.exists){
        console.log("connection established.");
        console.log(doc.data());
    }
    else
        console.log("No such document!");
})
.catch(function(error) {
    console.log("Error getting document:", error);
});

var ctx = document.getElementById('chart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Hours Studied',
            data: [3.5, 4, 2.5, 5, 0, 6, 3.25],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(204, 64, 255,0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(204, 64, 255,1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});