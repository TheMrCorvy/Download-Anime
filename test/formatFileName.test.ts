import { expect } from "chai"

import File from "../src/@types/file"

import formatFileName, { capitalize } from "../src/functions/formatFileName"

describe("given a file, the function should return the formatted path for that file", () => {
	it("should return the proper path for a file", () => {
		const rawFile: File = {
			id: "file_id_1",
			customName: "series 1",
			customIndex: 1,
			directory: "series 1/ova",
			url: "https://google.com/file.mkv",
		}

		expect(formatFileName(rawFile)).to.be.equal("Series 1/Ova/01 - Series 1.mkv")
	})

	it("should return a capitalize all the words", () => {
		const str = "franchise/series - alternative universe/season type-one/true ending"
		const capStr = "Franchise/Series - Alternative Universe/Season Type-One/True Ending"

		expect(capitalize(str)).to.be.equal(capStr)
	})
})
