import * as fs from "node:fs"

import { expect } from "chai"

import initializeProject from "../src/initializeProject"

describe("checks that the app creates the necessary files to start", () => {
	it("creates .json files", async () => {
		if (
			fs.existsSync("./queue.initializeProject.json") ||
			fs.existsSync("failedDownloads.initializeProject.json")
		) {
			fs.unlinkSync("./queue.initializeProject.json")
			fs.unlinkSync("./failedDownloads.initializeProject.json")
		}

		expect(fs.existsSync("./queue.initializeProject.json")).to.be.not.ok
		expect(fs.existsSync("./failedDownloads.initializeProject.json")).to.not.be.ok

		initializeProject()

		expect(fs.existsSync("./queue.initializeProject.json")).to.be.ok
		expect(fs.existsSync("./failedDownloads.initializeProject.json")).to.be.ok

		after(() => {
			if (
				fs.existsSync("./queue.initializeProject.json") ||
				fs.existsSync("failedDownloads.initializeProject.json")
			) {
				fs.unlinkSync("./queue.initializeProject.json")
				fs.unlinkSync("./failedDownloads.initializeProject.json")
			}
		})
	})

	it("creates the config file", () => {
		if (fs.existsSync("./src/config.ts")) {
			fs.unlinkSync("./src/config.ts")
		}

		expect(fs.existsSync("./src/config.ts")).to.be.not.ok

		initializeProject()

		expect(fs.existsSync("./src/config.ts")).to.be.ok

		after(() => {
			if (
				fs.existsSync("./queue.initializeProject.json") ||
				fs.existsSync("failedDownloads.initializeProject.json")
			) {
				fs.unlinkSync("./queue.initializeProject.json")
				fs.unlinkSync("./failedDownloads.initializeProject.json")
			}
		})
	})
})
