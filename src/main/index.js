'use strict'

import { app, BrowserWindow, BrowserView, ipcMain } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow, browserView
var browserViews = {}
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    useContentSize: true,
    width: 1000,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })
  browserView = new BrowserView({ webPreferences: { nodeIntegration: false } })

  mainWindow.loadURL(winURL)
  mainWindow.setBrowserView(browserView)
  let windowSize = mainWindow.getSize()

  browserView.setBounds({ x: 50, y: 0, width: windowSize[0] - 50, height: windowSize[1] })
  browserView.setAutoResize({ width: true, height: true, horizontal: true, vertical: true })
  browserView.webContents.loadURL('https://www.givecard.io/')

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

ipcMain.on('changeToTab', (event, data) => {
  let windowSize = mainWindow.getSize()
  if (browserViews[data] !== undefined) {
    mainWindow.setBrowserView(browserViews[data])
    browserViews[data].setBounds({ x: 50, y: 0, width: windowSize[0] - 50, height: windowSize[1] })
  } else {
    let newBrowserView = new BrowserView({ webPreferences: { nodeIntegration: false } })
    mainWindow.setBrowserView(newBrowserView)
    newBrowserView.setBounds({ x: 50, y: 0, width: windowSize[0] - 50, height: windowSize[1] })
    newBrowserView.setAutoResize({ width: true, height: true, horizontal: true, vertical: true })
    newBrowserView.webContents.loadURL(data)
    browserViews[data] = newBrowserView
  }
})

app.on('ready', createWindow)

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

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
