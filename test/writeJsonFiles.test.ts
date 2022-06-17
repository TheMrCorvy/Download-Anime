import * as fs from "node:fs"

import { expect } from "chai"

import writeJsonFiles from "../src/functions/writeJsonFiles"

describe("the app should be able to write new content on json files properly", () => {
	it("should be able to write the queue.json", () => {
		fs.writeFileSync(
			"./queue.writeJsonFiles.json",
			JSON.stringify({
				queue: [],
			})
		)

		writeJsonFiles("queue", {
			customName: "anime series 1",
			customIndex: 0,
			directory: "directory 1",
			url: "https://url.com",
			id: "id chapter 1",
		})

		const jsonQueue = JSON.parse(fs.readFileSync("./queue.writeJsonFiles.json", "utf8"))

		expect(jsonQueue).to.be.deep.equal({
			queue: [
				{
					customName: "anime series 1",
					customIndex: 0,
					directory: "directory 1",
					url: "https://url.com",
					id: "id chapter 1",
				},
			],
		})

		after(() => {
			if (fs.existsSync("./queue.writeJsonFiles.json")) {
				fs.unlinkSync("./queue.writeJsonFiles.json")
			}
		})
	})

	it("should be able to write the failedDownloads.json", () => {
		fs.writeFileSync(
			"./failedDownloads.writeJsonFiles.json",
			JSON.stringify({
				failedDownloads: [],
			})
		)

		writeJsonFiles("failedDownloads", {
			customName: "anime series 1",
			customIndex: 0,
			directory: "directory 1",
			url: "https://url.com",
			id: "id chapter 1",
		})

		const jsonFailedDownloads = JSON.parse(
			fs.readFileSync("./failedDownloads.writeJsonFiles.json", "utf8")
		)

		expect(jsonFailedDownloads).to.be.deep.equal({
			failedDownloads: [
				{
					customName: "anime series 1",
					customIndex: 0,
					directory: "directory 1",
					url: "https://url.com",
					id: "id chapter 1",
				},
			],
		})

		after(() => {
			if (fs.existsSync("failedDownloads.writeJsonFiles.json")) {
				fs.unlinkSync("./failedDownloads.writeJsonFiles.json")
			}
		})
	})
})
