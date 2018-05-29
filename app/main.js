const {
    app,
    BrowserWindow,
    ipcMain
} = require('electron')

let mainWindow

function createWinow() {
    mainWindow = new BrowserWindow({
        title: 'MTinyPng',
        width: 550,
        height: 340,
        frame: false,
        resizable: false,
        show: false,
    })

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.loadURL('file://' + __dirname + '/src/index.html')

    // mainWindow.webContents.openDevTools()

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.on('ready', createWinow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

ipcMain.on('mini-window-main', function(){
    mainWindow.minimize()
})

ipcMain.on('close-window-main', function () {
    app.quit()
})
