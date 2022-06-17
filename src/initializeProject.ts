#!/usr/bin/env node
import * as fs from "fs"

const initializeProject = async () => {
	const language =
		process.env.LANG || process.env.LANGUAGE || process.env.LC_ALL || process.env.LC_MESSAGES

	await fs.writeFile(
		"./queue.json",
		JSON.stringify({
			queue: [],
		}),
		(err) => {
			if (err) {
				console.error(err)
			} else if (process.env.NODE_ENV !== "test") {
				console.log("La lista de las descargas pendientes fue creada!")
			}
		}
	)

	await fs.writeFile(
		"./failedDownloads.json",
		JSON.stringify({
			failedDownloads: [],
		}),
		(err) => {
			if (err) {
				console.error(err)
			} else if (process.env.NODE_ENV !== "test") {
				console.log("La lista de las descargas pendientes fue creada!")
			}
		}
	)

	if (!fs.readFileSync("./src/config.ts")) {
		const config = `#!/usr/bin/env node

const config = {
	mainDirectory: "Downloads/",
	maxRetries: 7,
	allowClearConsole: true,
	language: "${language}"
}

export default config
`

		await fs.writeFile("./src/config.ts", config, (err) => {
			if (err) {
				console.error(err)
			} else if (process.env.NODE_ENV !== "test") {
				console.log("El archivo .env fue creado!")
			}
		})
	}
}

initializeProject()

export default initializeProject
