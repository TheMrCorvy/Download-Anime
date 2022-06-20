#!/usr/bin/env node

import File from "../@types/file"

const formatFileName: FormatFileName = ({ directory, customIndex, customName, url, id }) => {
	const formatArr = url.split(".")

	let format = formatArr[formatArr.length - 1] ? formatArr[formatArr.length - 1] : "undefined"
	format = format.length < 2 || format.length > 3 ? "undefined" : format
	format = format === "com" || format === "net" || format === "xyz" ? "undefined" : format

	let i: string

	if (customIndex) {
		i = `${customIndex < 10 ? "0" + customIndex : customIndex}`
	} else {
		i = id
	}

	return capitalize(`${directory}/${i} - ${customName}.${format}`)
}

export const capitalize = (str: string): string => {
	const evalCases = [" ", "-", "/"]

	let result = str

	evalCases.forEach((evalCase) => {
		const arr = result.split(evalCase)

		for (var i = 0; i < arr.length; i++) {
			arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
		}

		result = arr.join(evalCase)
	})

	return result
}

type FormatFileName = (props: File) => string

export default formatFileName
