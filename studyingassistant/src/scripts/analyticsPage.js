// manage app settings 
require('../scripts/dbConnection');
var db = firebase.firestore();
const {ipcRenderer} = require('electron');
var Chart = require('chart.js');

// request user info from backend
let username;
let emailVal;
let studyInfo;

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
        studyInfo = doc.data().studyTimeTrackers;
        console.log(studyInfo);
    }
    else
        console.log("No such document!");
})
.catch(function(error) {
    console.log("Error getting document:", error);
});

// get study info for past 7 days
let d = new Date();
let start = new Date(now.getFullYear(), 0, 0);
let diff = (d - start) + ((start.getTimezoneOffset() - d.getTimezoneOffset()) * 60 * 1000);
let oneDay = 1000 * 60 * 60 * 24;
let dayKey = Math.floor(diff / oneDay);
console.log('Day of year: ' + dayKey);

// search for past 7 days
lastWeekDay = dayKey - 7;


studiedHours = [3.5, 4, 2.5, 5, 0.5, 6, 3.25];
let avgStudy = studiedHours.reduce((a, b) => a + b, 0) / studiedHours.length;
let avgBreak = 0;

document.getElementById("avgStudy").innerText = 'Average Time Studied: '+avgStudy.toFixed(2)+' hours';
document.getElementById("avgBreak").innerText = 'Average Break Time: '+avgBreak.toFixed(2)+' hours';

var ctx = document.getElementById('chart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'hours studied',
            data: studiedHours,
            backgroundColor: [
                'rgba(54, 162, 235, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(54, 162, 235, 0.7)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        title: {
            display: true,
            text: 'Hours Studied'
        }
    }
});