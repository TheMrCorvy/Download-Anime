import * as fs from "node:fs"

import { expect } from "chai"

import app from "../src/index"
import initializeProject from "../src/initializeProject"

export const inputArr = [
	{
		directory: "directory 1",
		fileName: "anime series 1",
		id: "id series 1",
		fileArray: [
			{
				customName: "",
				customIndex: 0,
				directory: undefined,
				url: "https://url.com",
				id: "id chapter 1",
			},
			{
				customName: "",
				customIndex: undefined,
				directory: undefined,
				url: "https://url.com",
				id: "id chapter 2",
			},
			{
				customName: "",
				customIndex: undefined,
				directory: undefined,
				url: "https://url.com",
				id: "id chapter 3",
			},
		],
	},
	{
		directory: "directory 2",
		fileName: "anime series 2",
		id: "id series 2",
		fileArray: [
			{
				customName: "",
				customIndex: undefined,
				directory: undefined,
				url: "https://url.com",
				id: "id chapter 1",
			},
			{
				customName: "",
				customIndex: undefined,
				directory: undefined,
				url: "https://url.com",
				id: "id chapter 2",
			},
			{
				customName: "ova",
				customIndex: undefined,
				directory: undefined,
				url: "https://url.com",
				id: "id chapter 3",
			},
		],
	},
]

const outputArr = [
	{
		customName: "anime series 1",
		customIndex: 0,
		directory: "directory 1",
		url: "https://url.com",
		id: "id chapter 1",
	},
	{
		customName: "anime series 1",
		customIndex: 2,
		directory: "directory 1",
		url: "https://url.com",
		id: "id chapter 2",
	},
	{
		customName: "anime series 1",
		customIndex: 3,
		directory: "directory 1",
		url: "https://url.com",
		id: "id chapter 3",
	},
	{
		customName: "anime series 2",
		customIndex: 1,
		directory: "directory 2",
		url: "https://url.com",
		id: "id chapter 1",
	},
	{
		customName: "anime series 2",
		customIndex: 2,
		directory: "directory 2",
		url: "https://url.com",
		id: "id chapter 2",
	},
	{
		customName: "ova",
		customIndex: 3,
		directory: "directory 2",
		url: "https://url.com",
		id: "id chapter 3",
	},
]

it("should return an array of files propperly formatted", async () => {
	expect(await app(inputArr)).to.be.deep.equal(outputArr)
})
