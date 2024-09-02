fetch("http://localhost:8000", {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringify({ word: "traffic" }),
})
	.then((res) => res.json())
	.then((data) => {
		console.log("Success!");
		// console.log("Data: ", data.meaning[0].meanings);
		// console.log("Juice: ", data.meaning[0].meanings[0].definitions);
		data.meaning[0].meanings.forEach((object) => {
			const PoS = object.partOfSpeech;
			console.log(PoS);
			object.definitions.forEach((definition, index) => {
				console.log(index, definition.definition);
			});
		});
	})
	.catch((err) => {
		console.error("Error: ", err);
	});
