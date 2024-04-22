const { add } = require("../dist/app");

describe("add two numbers", () => {
	it("should add two input numbers correctly", () => {
		expect(add(1, 2)).toEqual(3);
	});
});
