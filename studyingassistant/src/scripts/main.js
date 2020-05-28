const electron = require('electron');
const url = require('url');
const path = require('path');
const express = require('express');
const request = require('request');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const {app, BrowserWindow, Menu, Notification, ipcMain} = electron;

// application setup and user login
let mainWindow;
var currUser = new Object();

// receives login info from user after login
ipcMain.on('sendUserInfo', (event, user) =>
{
    currUser.accountHolder = user;
    currUser.currName = user.email;
});

// sends back user info after reaching the welcome page
ipcMain.handle('getUser', (event) => 
{
    return currUser;
});

ipcMain.handle('logoutUser', (event)=>
{
    // clear info
    currUser = new Object();
});



/***** SPOTIFY BACKEND SETUP ALL GOES HERE *****/
var server = express();

// dependency setups
var client_id = 'b36df35577fa4fffa5e11564df2f5132'; // your client ID
var client_secret = '8965b3446a124dec9ff30eb21bd68472'; // your secret

// your application requests authorization
var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
};
  
request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
  
        // use the access token to access the Spotify Web API
        var token = body.access_token;
        var options = {
            url: 'https://api.spotify.com/v1/users/jmperezperez',
            headers: {
            'Authorization': 'Bearer ' + token
            },
            json: true
        };
        request.get(options, function(error, response, body) {
            console.log(body);
        });
    }
});

// initialize port
server.listen(8888, ()=> {
    console.log("API Server started on port:8888");
});



/***** WINDOW APPLICATION SETUP ALL GOES HERE *****/

// Listen for app to be ready
app.on('ready', function(){
    // Create new window
    mainWindow = new BrowserWindow({width:800, height:640, webPreferences: {nodeIntegration: true}});
    // Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../pages/loginPage.html'),
        protocol: 'file:', 
        slashes: true
    }));

    /****we'll keep this commented out for now until we're done using developer tools ****/
    //build menu from template
    //const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Menu.setApplicationMenu(mainMenu);

    //below code is for refocusing the window after an alert is given by the app
    const isWindows = process.platform === 'win32';
    let needsFocusFix = false;
    let triggeringProgrammaticBlur = false;

    mainWindow.on('blur', (event) => 
    {
        if(!triggeringProgrammaticBlur) 
        {
            needsFocusFix = true;
        }
    })

    mainWindow.on('focus', (event) => 
    {
        if(isWindows && needsFocusFix) 
        {
            needsFocusFix = false;
            triggeringProgrammaticBlur = true;
            setTimeout(function () 
            {
                mainWindow.blur();
                mainWindow.focus();
                setTimeout(function () 
                {
                    triggeringProgrammaticBlur = false;
                }, 100);
            }, 100);
        }
    });
});


//creating menu template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Create Reminder'
            },
            {
                label: 'Set Timer'
            },
            {
                label: 'Modify Routine'
            },
            {
                label: 'Quit',
                //check OS of device for shortcut functionality
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click()
                {
                    app.quit();
                }
            }
        ]
    }
];