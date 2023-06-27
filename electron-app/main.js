// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const Store = require('electron-store')
const store = new Store()
const {getCount, setCount, getWindowSettings, saveBounds} = require('./settings')
// const {ipcMain} = require('electron')

// IPC listener
// ipcMain.on('electron-store-get', async (event, val) => {
//   event.returnValue = store.get(val);
// });
// ipcMain.on('electron-store-set', async (event, key, val) => {
//   store.set(key, val);
// });5

const createWindow = () => {
  const bounds = getWindowSettings()
  console.log(bounds)
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: bounds[0],
    height: bounds[1],
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

    mainWindow.on("resized", () => {
      saveBounds(mainWindow.getSize())
      //sends to renderer process via preload w/callback
      const newWindowSize = getWindowSettings()
      const newValues = [newWindowSize[0] -150, newWindowSize[1] - 150]
      mainWindow.webContents.send('update-counter', newValues)
      // app.emit('resized', bounds[0], bounds[1]);
    })

  // and load the index.html of the app.
//   mainWindow.loadFile('index.html')
    mainWindow.loadURL('http://localhost:5173');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// Event handler for asynchronous incoming messages
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg)

  // Event emitter for sending asynchronous messages
  event.sender.send('asynchronous-reply', 'async pong')
})

// Event handler for synchronous incoming messages
ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) 

  // Synchronous event emmision
  event.returnValue = 'sync pong'
})



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.