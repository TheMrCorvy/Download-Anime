#!/usr/bin/env node

import inquirer from "inquirer"
import { v4 as uuidv4 } from "uuid"

import Series from "./@types/series"
import File from "./@types/file"

// import downloadAll from "./functions/downloadAll"

import { queue as jsonQueue } from "../queue.json"
import config from "./config"

import t from "./functions/translate"

const newLine = (lines?: number) => {
	if (lines) {
		;[...new Array(3)].forEach(() => console.log(" "))
	} else {
		console.log(" ")
	}
}

const app = async () => {
	let seriesArray: Series[] = []

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
	while (continueFillingArr) {
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
					default: t("No"),
				},
				{
					type: "number",
					name: "customIndex",
					message: t("input_custom_index"),
					default: t("No"),
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
			const chapter: File = {
				url: chapterPrompt.url,
				customName:
					chapterPrompt.customName !== t("No") ? chapterPrompt.customName : undefined,
				customIndex:
					chapterPrompt.customIndex !== t("No") ? chapterPrompt.customIndex : undefined,
				id: chapterId,
			}
			const indexOfSeries = seriesArray.findIndex((s) => s.id === seriesId)

			seriesArray[indexOfSeries].fileArray.push(chapter)

			const chapterLoad = await inquirer.prompt({
				type: "list",
				name: "continue",
				message: t("add_another_chapter_to_this_series"),
				choices: [t("yes"), t("No")],
			})

			if (chapterLoad.continue === t("No")) {
				continueAddingCapps = false
			}
		}

		newLine(2)

		const seriesLoad = await inquirer.prompt({
			type: "list",
			name: "continue",
			message: t("add_another_series_to_the_list"),
			choices: [t("yes"), t("No")],
		})

		if (seriesLoad.continue === t("No")) {
			continueFillingArr = false
		} else {
			newLine()
			continueAddingCapps = true
		}
	}

	seriesArray.forEach((s) => console.log(s))

	const initDownload = await inquirer.prompt({
		type: "list",
		name: "start",
		message: t("do_you_wish_to_download_this_list"),
		choices: [t("yes"), t("No")],
	})

	if (config.allowClearConsole) {
		console.clear()
	}

	if (initDownload.start === t("yes")) {
		// return await downloadFile(seriesArray)
	}
}

app()
