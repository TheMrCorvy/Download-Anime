import { es } from "../utils/es.json"
import { en } from "../utils/en.json"

import config from "config"

const t = (key: string) => {
	let langData: { [key: string]: string } = {}

	if (config.language === "es_ES.UTF-8") {
		langData = es
	} else {
		langData = en
	}

	return langData[key]
}

export default t
