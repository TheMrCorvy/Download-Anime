import { expect } from "chai"

import File from "../src/@types/file"

import removeFirst from "../src/functions/removeFirst"

describe("the app should remove elements from arrays", () => {
	it("should remove only the first item", () => {
		const arr: File[] = [
			{
				id: "file 1",
				customIndex: 0,
				customName: "name",
				directory: "directory",
				url: "https://google.com",
			},
			{
				id: "file 2",
				customIndex: 1,
				customName: "name",
				directory: "directory",
				url: "https://google.com",
			},
		]

		const { firstElement, updatedArr } = removeFirst(arr)

		// expect(firstElement).to.be.eql(arr[0])
		// expect(updatedArr).to.be.eql([
		// 	{
		// 		id: "file 2",
		// 		customIndex: 1,
		// 		customName: "name",
		// 		directory: "directory",
		// 		url: "https://google.com",
		// 	},
		// ])
	})

	it("should return empty arr if only has 1 item", () => {
		const arr: File[] = [
			{
				id: "file 1",
				customIndex: 0,
				customName: "name",
				directory: "directory",
				url: "https://google.com",
			},
		]

		const { firstElement, updatedArr } = removeFirst(arr)

		// expect(firstElement).to.be.eql(arr[0])
		// expect(updatedArr).to.be.eql([])
	})

	it("should check if there actually is anything to remove", () => {
		const arr: File[] = []

		const { firstElement, updatedArr } = removeFirst(arr)

		// expect(firstElement).to.be.eql(undefined)
		// expect(updatedArr).to.be.eql([])
	})
})
