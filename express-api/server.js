import cors from "cors";
import express from "express";

const app = express();

app.use(
	cors({
		origin: "*",
	})
);

app.post("/", async (req, res) => {
	const res = await fetch("http://localhost:11434/api/generate", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			model: "llama3.2",
			prompt: req.body.prompt,
			stream: false,
		}),
	});
	console.log(req.body);
});

app.listen(5000, () => {
	console.log("app running on port 3000");
});
