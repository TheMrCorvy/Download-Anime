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

	it("should consider the ending of an url, and handle it properly", () => {
		const caseDotCom: File = {
			id: "file_id_1",
			customName: "series 1",
			customIndex: 1,
			directory: "series 1/ova",
			url: "https://google.com",
		}

		const caseDotLargeUrl: File = {
			id: "file_id_1",
			customName: "series 1",
			customIndex: 1,
			directory: "series 1/ova",
			url: "https://google.some-web-page",
		}

		const caseDotSmallUrl: File = {
			id: "file_id_1",
			customName: "series 1",
			customIndex: 1,
			directory: "series 1/ova",
			url: "https://google.s",
		}

		const unsupportedFormat = "Series 1/Ova/01 - Series 1.undefined"

		expect(formatFileName(caseDotCom)).to.be.equal(unsupportedFormat)
		expect(formatFileName(caseDotLargeUrl)).to.be.equal(unsupportedFormat)
		expect(formatFileName(caseDotSmallUrl)).to.be.equal(unsupportedFormat)
	})

	it("should handle a file with no custom index properly", () => {
		const rawFile: File = {
			id: "file_id_1",
			customName: "series 1",
			customIndex: undefined,
			directory: "series 1/ova",
			url: "https://google.com/file.mkv",
		}

		expect(formatFileName(rawFile)).to.be.equal("Series 1/Ova/File_id_1 - Series 1.mkv")
	})
})
