// import paragraphArray from "./content-script.js";

// /// <reference types="chrome"/>
// create a context menu item
chrome.contextMenus.create({
	type: "normal",
	id: "betterMeanings",
	title: "get a better meaning",
	contexts: ["selection"],
});
// remove the old and create a fresh context menu instance of the extension
// chrome.contextMenus.remove("betterMeanings", () => {
// Ignore errors about the item not existing
//   chrome.contextMenus.create({
//     type: "normal",
//     id: "betterMeanings",
//     title: "better meaning?",
//     contexts: ["selection"],
//   });
// });

chrome.contextMenus.onClicked.addListener(async (data) => {
	let articleData = await getStorageValue();
	// chrome.storage.local.get(["article"], (result) => {
	// 	console.log("value currently is", result.article);
	// 	articleData = result.article;
	// });
	let selectedText: string;
	if (data.menuItemId === "betterMeanings") {
		selectedText = data.selectionText;
		console.log("Selected Text: ", selectedText);
	}
	const LLMResponse = await fetchResponse(selectedText, articleData);
	// console.log("llm response:", LLMResponse);
});

async function fetchResponse(text: string, article: string) {
	try {
		const res = await fetch("http://localhost:11434/api/generate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				model: "llama3.2",
				// original
				// prompt: `what is the meaning the sentence ${text} in the context of the article below: \n ${article}`, // TODO:change to meaning of word later

				// iterations:
				// prompt: `Read through this entire article: ${article}. THE ARTICLE IS OVER. What is the meaning of the sentence ${text} in the article's context?`,
				prompt: `Read through this entire article: ${article}. THE ARTICLE IS OVER. Tell me in short, what is the meaning of the sentence ${text} in the article's context?`, // works great! let's goo!!! i was super happy at this point, just when i wrote this!
				stream: false,
			}),
		});
		const data = await res.json();
		console.log(data.response);
		return data;
	} catch (err) {
		console.error(err);
	}
}

type StorageData = {
	article?: string;
};

async function getStorageValue() {
	const result = await new Promise<StorageData>((resolve, reject) => {
		chrome.storage.local.get(["article"], (result) => {
			if (chrome.runtime.lastError) {
				reject(chrome.runtime.lastError); // Handle error if necessary
			} else {
				resolve(result); // Resolve with the result from chrome.storage
			}
		});
	});

	const value = result.article; // Retrieve the value from the result
	console.log("Value retrieved:", value); // Use the value
	return value; // Return the value if needed
}

// Call the async function
getStorageValue();
