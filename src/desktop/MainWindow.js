// @flow
import IPC from './IPC'
import {BrowserWindow} from 'electron'
import open from './open'
import path from 'path'

export class MainWindow {
	_preventedAutoLogin: boolean;
	_startFile: string;
	_browserWindow: BrowserWindow;

	constructor() {
		this._preventedAutoLogin = false
		this._startFile = 'file://' + path.normalize(`${__dirname}/../../desktop.html`)
		this._browserWindow = new BrowserWindow({
			width: 1280,
			height: 800,
			autoHideMenuBar: true,
			webPreferences: {
				nodeIntegration: false,
				nodeIntegrationInWorker: false,
				// TODO: not a real os sandbox yet.
				// https://github.com/electron-userland/electron-builder/issues/2562
				// https://electronjs.org/docs/api/sandbox-option
				sandbox: true,
				// can't use contextIsolation because this will isolate
				// the preload script from the web app
				//contextIsolation: true,
				webSecurity: true,
				preload: path.join(__dirname, '/preload.js')
			}
		})

		IPC.init(this._browserWindow)

		this._browserWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
			const url = webContents.getURL()
			if (!url.startsWith('https://mail.tutanota.com') || !(permission === 'notifications')) {
				return callback(false)
			}
			return callback(true)
		})

		// we never open any new windows except for links in mails etc.
		// so open them in the browser, not in electron
		this._browserWindow.webContents.on('new-window', (e, url) => {
			open(url);
			e.preventDefault();
		});

		// should never be called, but if somehow a webview gets created
		// we kill it
		this._browserWindow.webContents.on('will-attach-webview', (e: Event, webPreferences, params) => {
			e.preventDefault()
		})

		// user clicked 'x' button
		this._browserWindow.on('close', () => {
			IPC.send('close-editor')
		})

		this._browserWindow.webContents.on('did-start-navigation', (e, url) => {
			if (url === this._startFile + '/login?noAutoLogin=true' && !this._preventedAutoLogin) {
				//prevent default on first navigation & load url ourselves
				this._browserWindow.loadURL(this._startFile + '?noAutoLogin=true')
				this._preventedAutoLogin = true;
			} else if (url === this._startFile + '/login?noAutoLogin=true') {
				// this one was triggered by our loadURL above and will actually work
				this._preventedAutoLogin = false
				return
			}
			e.preventDefault()
		})

		this._loadMailtoPath(process.argv.find((arg) => arg.startsWith('mailto')))
	}

	show(mailtoArg: ?string) {
		if (this._browserWindow.isMinimized()) {
			this._browserWindow.restore()
			this._browserWindow.show()
		} else {
			this._browserWindow.focus()
		}
		if (mailtoArg) {
			IPC.send('close-editor')
			this._loadMailtoPath(mailtoArg)
		}
	}

	_loadMailtoPath(mailtoArg: ?string): void {
		const mailtoPath = (mailtoArg)
			? "?requestedPath=%2Fmailto%23url%3D" + encodeURIComponent(mailtoArg)
			: ""
		this._browserWindow.loadURL(`${this._startFile}${mailtoPath}`)
	}
}