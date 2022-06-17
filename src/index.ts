#!/usr/bin/env node

import inquirer from "inquirer"
import { v4 as uuidv4 } from "uuid"

import { SeriesArray, Series } from "./@types/seriesArray"
import File from "./@types/file"

import downloadAll from "./functions/downloadAll"

import { pendingDownloads } from "../pendingDownloads.json"
import config from "./config"

const newLine = (lines?: number) => {
	if (lines) {
		;[...new Array(3)].forEach(() => console.log(" "))
	} else {
		console.log(" ")
	}
}

const app = async () => {
	let seriesArray: SeriesArray = []

	/**
	 * When the app starts, it first checks if there was any download
	 * pending. If there is, then it will start downloading from there,
	 * else, the app will ask the user to add them from the prompt
	 */
	if (pendingDownloads.length >= 1) {
		console.log("Encontramos que hay descargas pendientes, así que comenzaremos desde allí.")

		return downloadAll(undefined, true)
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
				message: "Ingresa la ubicación del Directorio:",
				default: "undefined",
			},
			{
				type: "input",
				name: "fileName",
				message: "Ingresa el Nombre de la Serie:",
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
					message: "Ingrese la URL del archivo",
				},
				{
					type: "input",
					name: "customName",
					message: "Tiene un Nombre particular?",
					default: "No",
				},
				{
					type: "number",
					name: "customIndex",
					message: "Tiene un Index particular?",
					default: "No",
				},
			])

			if (!chapterPrompt.url) {
				const newPrompt = await inquirer.prompt({
					type: "input",
					name: "url",
					message: "La URL del archivo está vacía, por favor ingrésela nuevamente.",
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
					chapterPrompt.customName !== "No" ? chapterPrompt.customName : undefined,
				customIndex:
					chapterPrompt.customIndex !== "No" ? chapterPrompt.customIndex : undefined,
				id: chapterId,
			}
			const indexOfSeries = seriesArray.findIndex((s) => s.id === seriesId)

			seriesArray[indexOfSeries].fileArray.push(chapter)

			const chapterLoad = await inquirer.prompt({
				type: "list",
				name: "continue",
				message: "Agregar otro capítulo más a esta serie?",
				choices: ["Sí", "No"],
			})

			if (chapterLoad.continue === "No") {
				continueAddingCapps = false
			}
		}

		newLine(2)

		const seriesLoad = await inquirer.prompt({
			type: "list",
			name: "continue",
			message: "Agregar otra serie más a la lista?",
			choices: ["Sí", "No"],
		})

		if (seriesLoad.continue === "No") {
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
		message: "Desea comenzar a descargar con esta lista?",
		choices: ["Sí", "No"],
	})

	if (config.allowClearConsole) {
		console.clear()
	}

	if (initDownload.start === "Sí") {
		downloadAll({ fileIndex: 0, seriesIndex: 0, seriesArray }, false, true)
	}
}

app()
