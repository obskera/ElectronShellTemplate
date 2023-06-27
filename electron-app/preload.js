// preload.js

// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron');
const { os } = require('os')
const { getCount, setCount, getWindowSettings } = require('./settings')


//Things exposed in here are avaliable by key in window (  const electron = (window as any).electron  )
contextBridge.exposeInMainWorld('electron', {
  homeDir: () => os.homedir(),
  store: {
    get(key) {
      return ipcRenderer.sendSync('electron-store-get', key);
    },
    set(property, val) {
      ipcRenderer.send('electron-store-set', property, val);
    },
    // Other method you want to add like has(), reset(), etc.
  },
  // Any other methods you want to expose in the window object.
  // ...
  getCount: getCount,
  setCount: setCount,
  getWindowSettings: getWindowSettings,
  onUpdateCounter: (callback) => ipcRenderer.on('update-counter', callback)

});

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  })