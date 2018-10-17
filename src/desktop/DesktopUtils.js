// @flow
import * as url from 'url'

export class DesktopUtils {
	static pathToFileURL(pathToConvert: string): string {
		const extraSlashForWindows = process.platform === "win32"
			? "/"
			: ""
		let urlFromPath = url.format({
			pathname: extraSlashForWindows + pathToConvert.trim(),
			protocol: 'file:'
		})

		return urlFromPath
			.replace(/ /g, "%20")
			.replace(/\\/g, "/")
			.trim()
	}
}