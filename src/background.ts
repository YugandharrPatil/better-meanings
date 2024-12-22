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

chrome.contextMenus.onClicked.addListener((data) => {
  if (data.menuItemId === "betterMeanings") {
    const selectedText = data.selectionText;
    console.log("Selected Text: ", selectedText);
  }
});
