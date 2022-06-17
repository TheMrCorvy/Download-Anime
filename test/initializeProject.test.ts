import * as fs from "node:fs"

import { expect } from "chai"

import initializeProject from "../src/initializeProject"

describe("checks that the app creates the necessary files to start", () => {
	it("creates .json files", async () => {
		if (
			(await fs.existsSync("./queue.initializeProject.json")) ||
			(await fs.existsSync("failedDownloads.initializeProject.json"))
		) {
			await fs.unlinkSync("./queue.initializeProject.json")
			await fs.unlinkSync("./failedDownloads.initializeProject.json")
		}

		expect(await fs.existsSync("./queue.initializeProject.json")).to.be.not.ok
		expect(await fs.existsSync("./failedDownloads.initializeProject.json")).to.not.be.ok

		await initializeProject()

		expect(await fs.existsSync("./queue.initializeProject.json")).to.be.ok
		expect(await fs.existsSync("./failedDownloads.initializeProject.json")).to.be.ok

		await fs.unlinkSync("./queue.initializeProject.json")
		await fs.unlinkSync("./failedDownloads.initializeProject.json")
	})
})
