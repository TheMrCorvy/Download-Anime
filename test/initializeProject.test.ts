import * as fs from "node:fs"

import { expect } from "chai"

import initializeProject from "../src/initializeProject"

describe("checks that the app creates the necessary files to start", () => {
	it("creates the .env and .json files", async () => {
		if (
			fs.existsSync(".env") ||
			fs.existsSync("queue.json" || fs.existsSync("failedDownloads.json"))
		) {
			fs.unlinkSync(".env")
			fs.unlinkSync("queue.json")
			fs.unlinkSync("failedDownloads.json")
		}

		expect(fs.existsSync(".env")).to.be.not.ok
		expect(fs.existsSync("queue.json")).to.be.not.ok
		expect(fs.existsSync("failedDownloads.json")).to.not.be.ok

		Promise.resolve(initializeProject()).then(() => {
			expect(fs.existsSync(".env")).to.be.ok
			expect(fs.existsSync("queue.json")).to.be.ok
			expect(fs.existsSync("failedDownloads.json")).to.be.ok
		})
	})
})
