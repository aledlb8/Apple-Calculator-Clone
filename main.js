const { app, BrowserWindow, nativeTheme  } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 400,
        height: 400,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            devTools: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile('src/index.html')
    nativeTheme.themeSource = 'dark'
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})