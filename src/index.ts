#!/usr/bin/env node

import * as fs from "node:fs"

import inquirer from "inquirer"
import { v4 as uuidv4 } from "uuid"

import Series from "./@types/series"
import File from "./@types/file"

import config from "./config"

import t from "./functions/translate"

const newLine = (lines?: number) => {
	if (lines) {
		;[...new Array(3)].forEach(() => console.log(" "))
	} else {
		console.log(" ")
	}
}

const app = async (testArr?: Series[]) => {
	const jsonQueue: Series[] = JSON.parse(fs.readFileSync("./queue.json", "utf8"))

	let seriesArray: Series[] = []

	if (process.env.NODE_ENV === "test" && testArr) {
		seriesArray = testArr
	}

	/**
	 * When the app starts, it first checks if there was any download
	 * pending. If there is, then it will start downloading from there,
	 * else, the app will ask the user to add them from the prompt
	 */
	if (jsonQueue.length >= 1) {
		console.log(t("pending_queue_was_found"))

		// return downloadFile(undefined, true)
	}

	let continueFillingArr = true
	let continueAddingCapps = true

	// Loop for adding series
	while (continueFillingArr && process.env.NODE_ENV !== "test") {
		if (config.allowClearConsole) {
			console.clear()
		}

		const season = await inquirer.prompt([
			{
				type: "input",
				name: "directory",
				message: t("input_dir_name"),
				default: "undefined",
			},
			{
				type: "input",
				name: "fileName",
				message: t("input_file_name"),
				default: "undefined",
			},
		])

		newLine()

		const seriesId = uuidv4()
		const series: Series = { ...season, id: seriesId, fileArray: [] }

		seriesArray.push(series)

		// Loop for adding chapters
		while (continueAddingCapps) {
			const chapterPrompt = await inquirer.prompt([
				{
					type: "input",
					name: "url",
					message: t("input_file_url"),
				},
				{
					type: "input",
					name: "customName",
					message: t("input_custom_name"),
					default: t("no"),
				},
				{
					type: "number",
					name: "customIndex",
					message: t("input_custom_index"),
					default: t("no"),
				},
			])

			if (!chapterPrompt.url) {
				const newPrompt = await inquirer.prompt({
					type: "input",
					name: "url",
					message: t("user_forgot_to_add_url"),
				})

				chapterPrompt.url = newPrompt.url
			}

			newLine(2)

			/**
			 * If the file has a custom name or index, then
			 * the app should take it into consideration.
			 */
			const chapterId = uuidv4()

			const indexOfSeries = seriesArray.findIndex((s) => s.id === seriesId)

			const chapter: File = {
				url: chapterPrompt.url,
				customName:
					chapterPrompt.customName !== t("no") ? chapterPrompt.customName : undefined,
				customIndex:
					chapterPrompt.customIndex !== t("no") && chapterPrompt.customIndex !== undefined
						? chapterPrompt.customIndex
						: undefined,
				id: chapterId,
				directory: seriesArray[indexOfSeries].directory,
			}

			seriesArray[indexOfSeries].fileArray.push(chapter)

			const chapterLoad = await inquirer.prompt({
				type: "list",
				name: "continue",
				message: t("add_another_chapter_to_this_series"),
				choices: [t("yes"), t("no")],
			})

			if (chapterLoad.continue === t("no")) {
				continueAddingCapps = false
			}
		}

		newLine(2)

		const seriesLoad = await inquirer.prompt({
			type: "list",
			name: "continue",
			message: t("add_another_series_to_the_list"),
			choices: [t("yes"), t("no")],
		})

		if (seriesLoad.continue === t("no")) {
			continueFillingArr = false
		} else {
			newLine()
			continueAddingCapps = true
		}
	}

	// Lets format the array of series, so there will only be 1 simple array of files
	const formattedSeriesArr: File[] = []

	seriesArray.forEach((series) => {
		series.fileArray.forEach((chapter, index) => {
			const chapterIndex = chapter.customIndex !== undefined ? chapter.customIndex : index + 1

			const chapterName = chapter.customName ? chapter.customName : series.fileName

			const chapterUrl = chapter.url
				? chapter.url
				: "https://falto-poner-el-link-de-descarga.com"

			formattedSeriesArr.push({
				...chapter,
				directory: series.directory,
				customIndex: chapterIndex,
				customName: chapterName,
				url: chapterUrl,
			})
		})
	})

	if (process.env.NODE_ENV === "test") {
		return formattedSeriesArr
	}

	// y luego escribirlo en queue.json

	seriesArray.forEach((s) => console.log(s))

	const initDownload = await inquirer.prompt({
		type: "list",
		name: "start",
		message: t("do_you_wish_to_download_this_list"),
		choices: [t("yes"), t("no")],
	})

	if (config.allowClearConsole) {
		console.clear()
	}

	if (initDownload.start === t("yes")) {
		// return await downloadFile(formattedSeriesArr)
	}
}

app()

export default app
