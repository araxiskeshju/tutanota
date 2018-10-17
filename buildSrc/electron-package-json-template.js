/**
 * This is used for launching electron:
 * 1. copied to app-desktop/build from build.js
 * 2. copied to app-desktop/build/dist from dist.js (DesktopBuilder)
 */

module.exports = function (nameSuffix, version, targetUrl, iconPath, sign) {
	return {
		"name": "tutanota-desktop" + nameSuffix,
		"main": "./src/desktop/mainDesktop.js",
		"version": version,
		"author": "Tutao GmbH",
		"description": "The desktop client for Tutanota, the secure e-mail service.",
		"scripts": {
			"start": "electron ."
		},
		"dependencies": {
			"electron-updater": "^3.1.2",
			"electron-debug": "^2.0.0"
		},
		"devDependencies": {
			"electron": "^3.0.0"
		},
		"build": {
			//"afterPack": "./buildSrc/builderHook.js",
			//"afterSign": "./buildSrc/builderHook.js",
			//"afterAllArtifactBuild": "./buildSrc/builderHook.js",
			"icon": iconPath,
			"protocols": [
				{
					"name": "Mailto Links",
					"schemes": [
						"mailto"
					],
					"role": "Editor"
				}
			],
			"publish": {
				"provider": "generic",
				"url": targetUrl,
				"channel": "latest",
				"publishAutoUpdate": true
			},
			"appId": "de.tutao.tutanota",
			"productName": nameSuffix.slice(1) + " Tutanota Desktop",
			"artifactName": "${name}-${version}-${os}.${ext}",
			"directories": {
				"output": "installers"
			},
			"win": {
				"publisherName": "Tutao GmbH",
				"sign": sign
					? "./buildSrc/winsigner.js"
					: undefined,
				"signingHashAlgorithms": [
					"sha256"
				],
				"target": [
					{
						"target": "nsis",
						"arch": "x64"
					}
				]
			},
			"mac": {
				"target": [
					{
						"target": "zip",
						"arch": "x64"
					}
				]
			},
			"linux": {
				"synopsis": "Tutanota Desktop Client",
				"category": "Network",
				"desktop": {
					"StartupWMClass": "Tutanota"
				},
				"target": [
					{
						"target": "AppImage",
						"arch": "x64"
					}
				]
			}
		}
	}
}