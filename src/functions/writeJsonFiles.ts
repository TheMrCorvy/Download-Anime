import * as fs from "node:fs"

import File from "../@types/file"

import t from "./translate"

const writeJsonFiles: WriteJsonFiles = (option, obj) => {
	const testing = process.env.NODE_ENV === "test"

	const path = "./" + option + `${testing ? ".writeJsonFiles.json" : ".json"}`

	const jsonQueue: JsonQueue = JSON.parse(fs.readFileSync(path, "utf8"))

	let newArr = [...jsonQueue[option]]

	if (Array.isArray(obj)) {
		newArr = [...newArr, ...obj]
	} else {
		newArr.push(obj)
	}

	fs.writeFileSync(
		path,
		JSON.stringify({
			[option]: [...newArr],
		})
	)

	if (!testing) {
		const message = option === "queue" ? "queue_created" : "failed_downloads_list_created"

		console.log(t(message))
	}
}

interface JsonQueue {
	queue: File[]
	failedDownloads: File[]
}

type WriteJsonFiles = (option: "queue" | "failedDownloads", obj: File | File[]) => void

export default writeJsonFiles
