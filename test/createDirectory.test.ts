import * as fs from "node:fs"

import { expect } from "chai"

import createDirectory from "../src/functions/createDirectory"

import config from "../src/config"

describe("the app should create directories only if needed", () => {
	it("should create the directory if it doesn't exists", () => {
		const dir = config.mainDirectory + "test 1/testing-directories"
		const dirCreated = config.mainDirectory + "Test 1/Testing-Directories"

		createDirectory(dir)

		expect(fs.existsSync(dirCreated)).to.be.true

		after(() => {
			if (fs.existsSync(dirCreated)) {
				fs.unlinkSync(dirCreated)
			}
		})
	})

	it("should reuse a directory that was already created, instead of creating a copy", () => {
		const dir = config.mainDirectory + "test 2/testing-directories"
		const dirCreated = config.mainDirectory + "Test 2/Testing-Directories"

		fs.mkdirSync(config.mainDirectory)

		createDirectory(dir)

		expect(fs.existsSync(dirCreated)).to.be.true

		after(() => {
			if (fs.existsSync(dirCreated)) {
				fs.unlinkSync(dirCreated)
			}
		})
	})
})
