import { expect } from "chai"

import t from "../src/functions/translate"
import config from "../src/config"
import { es } from "../src/lang/es.json"
import { en } from "../src/lang/en.json"

it("should translate the messages properly", () => {
	const testMessageES = es.test
	const testMessageEN = en.test

	config.language = "es_ES.UTF-8"

	expect(t("test")).to.be.equal(testMessageES)

	config.language = "en_US.UTF-8"

	expect(t("test")).to.be.equal(testMessageEN)
})
