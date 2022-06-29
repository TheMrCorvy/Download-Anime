import * as fs from "node:fs"

import { expect } from "chai"

import createDirectory from "../src/functions/createDirectory"
import config from "../src/config"

describe("the app should create directories only if needed", () => {
	it("should create the directory if it doesn't exists", () => {
		const dir = "test 1/testing-directories"
		const dirCreated = config.mainDirectory + "Test 1/Testing-Directories"

		createDirectory(dir)

		expect(fs.existsSync(dirCreated)).to.be.true

		after(() => {
			fs.rmdirSync(dirCreated)
			fs.rmdirSync(config.mainDirectory + "Test 1")
		})
	})

	it("should reuse a directory that was already created, instead of creating a copy", () => {
		const dir1 = "test 2"
		const dir2 = "test 2/testing-directories"
		const dirCreated = config.mainDirectory + "Test 2/Testing-Directories"

		createDirectory(dir1)
		createDirectory(dir2)

		expect(fs.existsSync(dirCreated)).to.be.true

		after(() => {
			fs.rmdirSync(dirCreated)
			fs.rmdirSync(config.mainDirectory + "Test 2")
		})
	})
})
