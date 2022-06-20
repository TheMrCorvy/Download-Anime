import { es } from "../lang/es.json"
import { en } from "../lang/en.json"

import config from "../config"

const t = (key: string = "test") => {
	let langData: { [key: string]: string } = {}

	if (config.language === "es_ES.UTF-8") {
		langData = es
	} else {
		langData = en
	}

	return langData[key]
}

export default t
