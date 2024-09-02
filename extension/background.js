// chrome.contextMenus.create({
// 	id: "betterMeanings",
// 	title: "Get a better meaning",
// 	contexts: ["selection"],
// });

// SOLUTION 1
// let contextMenuCreated = false;

// if (!contextMenuCreated) {
// 	chrome.contextMenus.create({
// 		id: "betterMeanings",
// 		title: "Get a better meaning",
// 		contexts: ["selection"],
// 	});
// 	contextMenuCreated = true;
// }

chrome.contextMenus.remove("betterMeanings", () => {
	// Ignore errors about the item not existing
	chrome.contextMenus.create({
		id: "betterMeanings",
		title: "better meaning?",
		contexts: ["selection"],
	});
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "betterMeanings") {
		const selectedText = info.selectionText;
		console.log("Selected Text: ", selectedText);

		fetch("http://localhost:8000", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ word: selectedText }),
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
	}
});
