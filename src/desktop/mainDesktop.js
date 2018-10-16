// @flow
import {app} from 'electron'
import electronDebug from 'electron-debug'
import ElectronUpdater from './ElectronUpdater.js'
import {MainWindow} from './MainWindow'

let mainWindow: MainWindow

electronDebug({
	enabled: true,
	showDevTools: false,
})

if (!app.requestSingleInstanceLock()) {
	app.quit()
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		mainWindow = new MainWindow()
	}
	mainWindow.show()
})

app.on('second-instance', (e, argv, cwd) => {
	if (mainWindow) {
		mainWindow.show(argv.find((arg) => arg.startsWith('mailto')))
	}
})

app.on('ready', () => {
	mainWindow = new MainWindow()
	ElectronUpdater.initAndCheck()
})