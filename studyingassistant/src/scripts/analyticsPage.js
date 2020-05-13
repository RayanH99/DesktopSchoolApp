// manage app settings 
require('../scripts/dbConnection');
var db = firebase.firestore();
const {ipcRenderer} = require('electron');
var Chart = require('chart.js');

// request user info from backend
let username;
let emailVal;
let prevBreakHours;
let prevStudyHours;

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
        prevStudyHours = doc.data().prevStudyAvg;
        prevBreakHours = doc.data().prevBreakAvg;
        calculateAvg();
    }
    else
        console.log("No such document!");
})
.catch(function(error) {
    console.log("Error getting document:", error);
});

let studiedHours = [];
let breakHours = [];
let daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const calculateAvg = () => {
    for (day in daysOfWeek) {
        studiedHours.push(studyInfo[daysOfWeek[day]].study);
        breakHours.push(studyInfo[daysOfWeek[day]].break);
    }
    
    let avgStudy = studiedHours.reduce((a, b) => a + b, 0) / studiedHours.length;
    let avgBreak = breakHours.reduce((a, b) => a + b, 0) / breakHours.length;
    
    document.getElementById("avgStudy").innerText = 'Average Time Studied: '+avgStudy.toFixed(2)+' hours';
    document.getElementById("avgBreak").innerText = 'Average Break Time: '+avgBreak.toFixed(2)+' hours';
    document.getElementById("prevAvgStudy").innerText = 'Last Week Average Study Time: '+prevStudyHours.toFixed(2)+' hours';
    document.getElementById("prevAvgBreak").innerText = 'Last Week Average Break Time: '+prevBreakHours.toFixed(2)+' hours';
}

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