const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, Notification, ipcMain} = electron;

let mainWindow;

var currUser = new Object();

//receives login info from user after login
ipcMain.on('sendUserInfo', (event, user) =>
{
    currUser.accountHolder = user;
    currUser.currName = user.email;
});

//sends back user info after reaching the welcome page
ipcMain.handle('getUser', (event) => 
{
    return currUser;
});

ipcMain.handle('logoutUser', (event)=>
{
    //clear info
    currUser = new Object();
});

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

    //****we'll keep this commented out for now until we're done using developer tools */
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