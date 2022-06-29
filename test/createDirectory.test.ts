import * as fs from "node:fs"

import { expect } from "chai"

import createDirectory from "../src/functions/createDirectory"

describe("the app should create directories only if needed", () => {
	it("should create the directory if it doesn't exists", () => {
		const dir = "test 1/testing-directories"
		const dirCreated = "Test 1/Testing-Directories"

		createDirectory(dir)

		expect(fs.existsSync(dirCreated)).to.be.true

		after(() => {
			if (fs.existsSync(dirCreated)) {
				fs.unlinkSync(dirCreated)
			}
		})
	})

	it("should reuse a directory that was already created, instead of creating a copy", () => {
		const dir = "test 2/testing-directories"
		const dirCreated = "Test 2/Testing-Directories"

		fs.mkdirSync("Test 2")

		createDirectory(dir)

		expect(fs.existsSync(dirCreated)).to.be.true

		after(() => {
			if (fs.existsSync(dirCreated)) {
				fs.unlinkSync(dirCreated)
			}
		})
	})
})
