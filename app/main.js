const {
    app,
    BrowserWindow,
    ipcMain,
    Notification
} = require('electron')

let mainWindow,noticeWindow

function createWinow() {
    mainWindow = new BrowserWindow({
        title: 'MTool',
        width: 800,
        height: 494,
        frame: false,
        resizable: false,
        show: false,
        opacity: 0.9,
        titleBarStyle: 'hiddenInset'
    })

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.loadURL('file://' + __dirname + '/src/index.html')

    mainWindow.webContents.openDevTools()

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

ipcMain.on('window-main-mini', function(){
    mainWindow.minimize()
})

ipcMain.on('window-main-close', function () {
    app.quit()
})


ipcMain.on('notice-mini-done', function (sender, content) {
    let _reduce = content.initSize - content.resultSize
    if (Notification.isSupported()) {
        noticeWindow = new Notification({
            title: 'TinyPng',
            body: `已处理${content.count}个文件，压缩空间${(_reduce / 1024).toFixed(2)}kb；压缩占比${Math.round((_reduce/content.initSize).toFixed(2) * 100)}%`
        })

        noticeWindow.show()

        noticeWindow.on('close', function () {
            noticeWindow = null
        })
    }
})
