import mongoose from "mongoose";
import * as dotenv from "dotenv";
import express from "express";

export const app = express();

dotenv.config();

app.use(express.json());

const mongoURI = process.env.MONGO_URI || "";

const recordSchema = new mongoose.Schema({
	title: String,
	body: String,
});

const Record = mongoose.model("Record", recordSchema);

app.post("/add", async (req, res) => {
	const title: string | undefined = req.body.title;
	const body: string | undefined = req.body.body;
	if (!title || !body) {
		res.status(400).send("invalid record");
		return;
	}
	try {
		await mongoose.connect(mongoURI);
		console.log("connected to server");

		const recordToPost = new Record({
			title: title,
			body: body,
		});

		const result = await recordToPost.save();
		console.log(`A record was inserted with the id: ${result._id}`);
		res.status(201).send({ recordId: result._id });
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
			res.status(500).send("something went wrong");
		}
	} finally {
		await mongoose.disconnect();
	}
});
