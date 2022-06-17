#!/usr/bin/env node
import * as fs from "fs"
import t from "./functions/translate"

const initializeProject = async () => {
	const language =
		process.env.LANG || process.env.LANGUAGE || process.env.LC_ALL || process.env.LC_MESSAGES

	await fs.writeFile(
		process.env.NODE_ENV !== "test" ? "./queue.json" : "./queue.initializeProject.json",
		JSON.stringify({
			queue: [],
		}),
		(err) => {
			if (err) {
				console.error(err)
			} else if (process.env.NODE_ENV !== "test") {
				console.log(t("queue_created"))
			}
		}
	)

	await fs.writeFile(
		process.env.NODE_ENV !== "test"
			? "./failedDownloads.json"
			: "./failedDownloads.initializeProject.json",
		JSON.stringify({
			failedDownloads: [],
		}),
		(err) => {
			if (err) {
				console.error(err)
			} else if (process.env.NODE_ENV !== "test") {
				console.log(t("failed_downloads_list_created"))
			}
		}
	)

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
			console.log(t("config_file_created"))
		}
	})
}

initializeProject()

export default initializeProject
