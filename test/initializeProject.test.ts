import * as fs from "node:fs"

import { expect } from "chai"

import initializeProject from "../src/initializeProject"

describe("checks that the app creates the necessary files to start", () => {
	it("creates the config and .json files", async () => {
		if (
			fs.existsSync("./src/config.ts") ||
			fs.existsSync("queue.json" || fs.existsSync("failedDownloads.json"))
		) {
			fs.unlinkSync("./src/config.ts")
			fs.unlinkSync("queue.json")
			fs.unlinkSync("failedDownloads.json")
		}

		expect(fs.existsSync("./src/config.ts")).to.be.not.ok
		expect(fs.existsSync("queue.json")).to.be.not.ok
		expect(fs.existsSync("failedDownloads.json")).to.not.be.ok

		Promise.resolve(initializeProject()).then(() => {
			expect(fs.existsSync("./src/config.ts")).to.be.ok
			expect(fs.existsSync("queue.json")).to.be.ok
			expect(fs.existsSync("failedDownloads.json")).to.be.ok
		})
	})
})
