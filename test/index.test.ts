import { expect } from "chai"

import holaMundo, { algo } from "../src/index"

it("should pass as well", () => {
	const someVar = holaMundo()

	expect(someVar).to.be.ok

	expect(algo()).to.be.equal(false)
})
