const paragraphsNodeList = document.querySelectorAll(".mw-body-content p");
let paragraphsArray = [];
paragraphsNodeList.forEach((p) => {
	paragraphsArray.push(p.innerText);
});
console.log(paragraphsArray);
chrome.storage.local.set({ article: paragraphsArray }, () => {
	console.log("article saved in chrome storage successfully!");
});
// TODO: send this paragraph list to the LLM API to parse through.
