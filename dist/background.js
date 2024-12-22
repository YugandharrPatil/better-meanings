import axios from "axios";
import paragraphArray from "./content.js";

// /// <reference types="chrome"/>
// create a context menu item
chrome.contextMenus.create({
  type: "normal",
  id: "betterMeanings",
  title: "better meaning?",
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
  if (data.menuItemId === "betterMeanings") {
    const selectedText = data.selectionText;
    console.log("Selected Text: ", selectedText);

    // TODO: logic of sending this to LLM API
    // ollama API code here with prompt: "what is the meaning of the sentence <selectedText> in the context of <parsed article>"
    const response = await axios.post("https://localhost:11434/api/generate", {
      model: "llama:3.2",
      prompt: `what is the meaning of ${selectedText} in the context of ${paragraphArray}`,
    });
  }
});
