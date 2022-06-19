#!/usr/bin/env node
import * as fs from "fs"
import t from "./functions/translate"

const initializeProject = () => {
	const language =
		process.env.LANG || process.env.LANGUAGE || process.env.LC_ALL || process.env.LC_MESSAGES

	const testing = process.env.NODE_ENV === "test" ? ".initializeProject" : ""

	fs.writeFileSync(
		`./queue${testing}.json`,
		JSON.stringify({
			queue: [],
		})
	)

	fs.writeFileSync(
		`./failedDownloads${testing}.json`,
		JSON.stringify({
			failedDownloads: [],
		})
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

	fs.writeFileSync("./src/config.ts", config)

	if (process.env.NODE_ENV !== "test") {
		console.log(t("queue_created"))
		console.log(" ")
		console.log(t("failed_downloads_list_created"))
		console.log(" ")
		console.log(t("config_file_created"))
	}
}

initializeProject()

export default initializeProject
