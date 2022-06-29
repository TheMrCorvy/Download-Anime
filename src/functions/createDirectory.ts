#!/usr/bin/env node

import * as fs from "fs"

import { capitalize } from "./formatFileName"
import t from "./translate"

import config from "../config"

const createDirectory: CreateDirectory = (path) => {
	const testing = process.env.NODE_ENV === "test"
	const arrDir = capitalize(path).split("/")
	let directoriesCreated = "./"

	if (!fs.existsSync(config.mainDirectory)) {
		fs.mkdirSync(config.mainDirectory)
	}

	directoriesCreated = directoriesCreated + config.mainDirectory

	arrDir.forEach((dir) => {
		if (!fs.existsSync(directoriesCreated + dir)) {
			fs.mkdirSync(directoriesCreated + dir)

			directoriesCreated = directoriesCreated + dir + "/"

			!testing && console.log(`${t("folder")} ${dir} ${t("created")}`)
		} else {
			directoriesCreated = directoriesCreated + dir + "/"

			!testing && console.log(`${t("folder")} ${dir} ${t("already_existed")}`)
		}
	})
}

type CreateDirectory = (path: string) => void

export default createDirectory
