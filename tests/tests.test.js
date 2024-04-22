const request = require("supertest");
const { app } = require("../dist/app");

describe("POST /add", () => {
	test("should respond with 201 status", async () => {
		const response = await request(app).post("/add").send({
			title: "lorem ipsum",
			body: "sit dolor amet",
		});
		expect(response.statusCode).toBe(201);
	});
});
