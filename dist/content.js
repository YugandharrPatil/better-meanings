const paragraphsNodeList = document.querySelectorAll(".mw-body-content p");

// FOREACH
let paragraphsArray = [];

paragraphsNodeList.forEach((p) => {
  paragraphsArray.push(p.innerText);
});

console.log(paragraphsArray);

export default paragraphsArray;

// TODO: send this paragraph list to the LLM API to parse through.
