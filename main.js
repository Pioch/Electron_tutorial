const { app, BrowserWindow, Menu } = require('electron')
const path = require('node:path')

const template = [
  {
    label: 'File',
    submenu: [
      { role: 'quit' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { 
        role: 'reload',
        accelerator: 'F5'
      },
      { 
        role: 'forceReload',
        accelerator: 'Ctrl+F5'
      },
      { 
        role: 'toggleDevTools', 
        accelerator: 'F12' 
      },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { 
        role: 'togglefullscreen',
        accelerator: 'F11'
      }
    ]
  },
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
  
    win.loadFile('index.html')
  }

  app.whenReady().then(() => {
    createWindow() //utworzenie okna po aktywowaniu aplikacji
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow(); //otworzenie okna kiedy wszystkie są zamknięte i aplikacja jest uruchomiona
      }
    })
  })
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit() //wyłącza aplikację jak zamknięte są wszystkie okna (nie na Mac)
    }
  })
