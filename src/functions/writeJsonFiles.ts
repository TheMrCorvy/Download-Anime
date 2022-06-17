import * as fs from "node:fs"

import File from "../@types/file"

import t from "./translate"

const writeJsonFiles: WriteJsonFiles = (option, obj) => {
	const testing = process.env.NODE_ENV === "test"

	const path = "./" + option + `${testing ? ".writeJsonFiles.json" : ".json"}`

	const jsonQueue: JsonQueue = JSON.parse(fs.readFileSync(path, "utf8"))

	const newArr = [...jsonQueue[option]]

	newArr.push(obj)

	if (option === "queue") {
		fs.writeFileSync(
			path,
			JSON.stringify({
				queue: newArr,
			})
		)
	} else {
		fs.writeFileSync(
			path,
			JSON.stringify({
				failedDownloads: newArr,
			})
		)
	}
}

interface JsonQueue {
	queue: File[]
	failedDownloads: File[]
}

type WriteJsonFiles = (option: "queue" | "failedDownloads", obj: File) => void

export default writeJsonFiles
