declare module 'electron' {
	declare export var app: {
		on(AppEvent, (Event, ...Array<any>) => void): void,
		requestSingleInstanceLock(): void,
		quit(): void,
		getVersion(): string,
	};
	declare export var remote: any;
	declare export var ipcRenderer: any;
	declare export var ipcMain: any;

	declare export class BrowserWindow {
		// https://github.com/electron/electron/blob/master/docs/api/browser-window.md#new-browserwindowoptions
		constructor(any): BrowserWindow;
		on(BrowserWindowEvent, (Event, ...Array<any>) => void): BrowserWindow;
		focus(): void;
		restore(): void;
		show(): void;
		loadFile(string): void;
		loadURL(string): void;
		isMinimized(): boolean;
		openDevTools(): void;
		webContents: WebContents;
	}

	declare export class WebContents {
		on(WebContentsEvent, (Event, ...Array<any>) => void): WebContents;
		send(BridgeMessage, any): void;
		session: ElectronSession;
		getURL(): string;
		openDevTools({|mode: string|}): void;
		isDevToolsOpened(): boolean;
		closeDevTools(): void;
		reloadIgnoringCache(): void;
	}

	declare export class ElectronSession {
		setPermissionRequestHandler: (PermissionRequestHandler | null) => void;
	}

	declare export type PermissionRequestHandler = (WebContents, ElectronPermission, (boolean) => void) => void;
	declare export type ElectronPermission
		= 'media'
		| 'geolocation'
		| 'notifications'
		| 'midiSysex'
		| 'pointerLock'
		| 'fullscreen'
		| 'openExternal';
}

declare module 'electron-updater' {
	declare export var autoUpdater: AutoUpdater
}

declare module 'electron-localshortcut' {
	declare module .exports: {
		register(shortcut: string, cb: Function): void;
		unregister(shortcut: string): void;
		isRegistered(shortcut: string): boolean;
		unregisterAll(): void;
		enableAll(): void;
		disableAll(): void;
	}
;
}

declare class AutoUpdater {
	on: (AutoUpdaterEvent, (Event, ...Array<any>) => void) => void;
	logger: {
		info: (string) => void,
		debug: (string) => void,
		verbose: (string) => void,
		error: (string) => void,
		warn: (string) => void,
		silly: (string) => void
	};
	checkForUpdatesAndNotify: () => Promise<any>
}

export type Bridge = {|
	sendMessage: (msg: BridgeMessage, data: any) => void,
	startListening: (msg: BridgeMessage, listener: Function) => void,
	stopListening: (msg: BridgeMessage, listener: Function) => void,
	getVersion: () => string,
|}

// https://github.com/electron/electron/blob/master/docs/api/app.md#events
export type AppEvent = 'will-finish-launching' |
	'ready' |
	'second-instance' |
	'activate' |
	'window-all-closed' |
	'before-quit' |
	'will-quit' |
	'open-file' |
	'open-url' |
	'continue-activity' |
	'will-continue-activity' |
	'continue-activity-error' |
	'activity-was-continued' |
	'update-activity-state' |
	'new-window-for-tab' |
	'browser-window-blur' |
	'browser-window-focus' |
	'browser-window-created' |
	'web-contents-created' |
	'certificate-error' |
	'select-client-certificate' |
	'login' |
	'gpu-process-crashed' |
	'accessibility-support-changed' |
	'session-created'


// https://github.com/electron/electron/blob/master/docs/api/browser-window.md#instance-events
export type BrowserWindowEvent = 'page-title-updated' |
	'close' |
	'closed' |
	'session-end' |
	'unresponsive' |
	'responsive' |
	'blur' |
	'focus' |
	'show' |
	'hide' |
	'ready-to-show' |
	'maximize' |
	'unmaximize' |
	'minimize' |
	'restore' |
	'will-resize' |
	'resize' |
	'will-move' |
	'move' |
	'moved' |
	'enter-full-screen' |
	'leave-full-screen' |
	'enter-html-full-screen' |
	'leave-html-full-screen' |
	'always-on-top-changed' |
	'app-command' |
	'scroll-touch-begin' |
	'scroll-touch-end' |
	'scroll-touch-edge' |
	'swipe' |
	'sheet-begin' |
	'sheet-end' |
	'new-window-for-tab'

// https://github.com/electron/electron/blob/master/docs/api/web-contents.md#instance-events
export type WebContentsEvent = 'did-finish-load' |
	'did-fail-load' |
	'did-frame-finish-load' |
	'did-start-loading' |
	'did-stop-loading' |
	'dom-ready' |
	'page-favicon-updated' |
	'new-window' |
	'will-navigate' |
	'did-start-navigation' |
	'will-redirect' |
	'did-redirect-navigation' |
	'did-navigate' |
	'did-frame-navigate' |
	'did-navigate-in-page' |
	'will-prevent-unload' |
	'crashed' |
	'unresponsive' |
	'responsive' |
	'plugin-crashed' |
	'destroyed' |
	'before-input-event' |
	'devtools-opened' |
	'devtools-closed' |
	'devtools-focused' |
	'certificate-error' |
	'select-client-certificate' |
	'login' |
	'found-in-page' |
	'media-started-playing' |
	'media-paused' |
	'did-change-theme-color' |
	'update-target-url' |
	'cursor-changed' |
	'context-menu' |
	'select-bluetooth-device' |
	'paint' |
	'devtools-reload-page' |
	'will-attach-webview' |
	'did-attach-webview' |
	'console-message'

export type AutoUpdaterEvent = 'error' |
	'checking-for-update' |
	'update-available' |
	'update-not-available' |
	'download-progress' |
	'update-downloaded'


// Add Tutanota specific Messages here
export type BridgeMessage
	= 'window-close'    // user closed the client
	| 'close-editor'    // try to close the mail editor
	| 'editor-closed'   // editor was closed
	| 'mailto'          // external navigation event
