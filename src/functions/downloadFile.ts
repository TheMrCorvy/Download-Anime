import * as https from "node:https"
import * as fs from "node:fs"

import { DownloadFile } from "../@types/downloadFile"

import writeJsonFiles from "./writeJsonFiles"
import removeFirst from "./removeFirst"
import t from "./translate"
import formatFileName, { capitalize } from "./formatFileName"
import createDirectory from "./createDirectory"

import config from "../config"

const downloadFile: DownloadFile = async ({ queue, retryInstance }) => {
	if (config.allowClearConsole) console.clear()

	if (retryInstance >= config.maxRetries) {
		const { firstElement, updatedArr } = removeFirst(queue)

		if (firstElement) {
			writeJsonFiles("failedDownloads", firstElement)
		}

		writeJsonFiles("queue", updatedArr)

		console.log(t("download_keeps_failling"))

		if (updatedArr.length >= 1) {
			console.log(" ")
			console.log(t("skipping_to_the_next_one"))

			return await downloadFile({
				queue: updatedArr,
				retryInstance: 0,
			})
		} else {
			console.log(t("all_downloads_finished"))
			console.log("daru: MISSION COMPLETE!!!!!")
			return
		}
	}

	const file = queue[0]
	const directory = file.directory || "undefined"

	const req = https.get(file.url, async (res) => {
		const headers = res.headers["content-length"] ? res.headers["content-length"] : ""
		const len = parseInt(headers, 10)
		let cur = ""
		const total = len / 1048576 // amount of bytes in a mb
		const divideBy = total < 250 ? 10 : 5
		let lastProgress = 0

		// if the request gets an invalid response
		// if (total < 10 || isNaN(total)) {
		// 	console.log(t("error_handling_the_request"))
		// 	console.log(t("retry_number") + " " + retryInstance)
		// 	console.log(
		// 		`${t("downloading_file")}: ${file.customIndex} - ${capitalize(file.customName)}`
		// 	)

		// 	return await downloadFile({ queue, retryInstance: retryInstance + 1 })
		// }

		console.log(`${t("download_started")} ${total.toFixed(2)}mb`)
		console.log(
			`${t("downloading_file")}: ${file.customIndex} - ${capitalize(file.customName)}`
		)

		createDirectory(directory)

		// lets start actually writting the file
		const fileStream = fs.createWriteStream(formatFileName(file))

		fileStream.on("error", async (err) => {
			console.error(err)
			console.log(t("error_writting_the_document"))
			console.log(t("retry_number") + " " + retryInstance)
			console.log(capitalize(file.customName))

			return await downloadFile({ queue, retryInstance: retryInstance + 1 })
		})

		res.pipe(fileStream)

		// show the percentage of the download
		if (total < 500) {
			res.on("data", (chunk) => {
				cur += chunk

				const downloadedAmount: number = +((100.0 * cur.length) / len).toFixed(2)

				if (downloadedAmount % divideBy === 0 && downloadedAmount !== lastProgress) {
					console.log(downloadedAmount + "%")

					lastProgress = downloadedAmount
				}
			})
		} else {
			console.log(t("file_is_too_big_to_show_progress_bar"))
		}

		// the request has officially finished, but there might be some delay to finish writting the document
		res.on("end", () => console.log(t("download_finished")))

		// end writting the document, close the filestream, and after that call downloadFila again if necessary
		fileStream.on("finish", () => {
			fileStream.close()

			console.log("Documento escrito con éxito!")
		})

		fileStream.on("close", async () => {
			const { updatedArr } = removeFirst(queue)

			writeJsonFiles("queue", updatedArr)

			if (updatedArr.length >= 1) {
				console.log(t("finished_writting_document"))

				return await downloadFile({
					queue: updatedArr,
					retryInstance: 0,
				})
			} else {
				console.log(t("all_downloads_finished"))
				console.log("daru: MISSION COMPLETE!!!!!")
				return
			}
		})
	})

	req.on("error", async (err) => {
		console.error(err)
		console.log(t("error_handling_the_request"))
		console.log(t("retry_number") + " " + retryInstance)
		console.log(capitalize(file.customName))

		return await downloadFile({ queue, retryInstance: retryInstance + 1 })
	})
}

export default downloadFile
