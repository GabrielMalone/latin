import { mouseOverEvents } from "./wordEvents.js";
/**
 * create the div container for each word
 */
const createWordDiv = (word) => {
  const wordDiv = document.createElement("div");
  wordDiv.className = "word";
  wordDiv.textContent = word;
  return wordDiv;
};
/**
 * create interactable Latin text area
 */
export const createLatinTextArea = async () => {
  let data = document.querySelector("#sourceArea").value;
  const mainContainer = document.getElementById("latinText");
  // outtermost container of the Latin text
  const lines = data.split("\n");
  lines.forEach((line) => {
    // create a div for each line of text
    const lineContainer = document.createElement("div");
    lineContainer.className = "line-container";
    const words = line.split(" "); // put words into their own divs and into their correct div-line
    words.forEach((word) => {
      let wordDiv = createWordDiv(word);
      mouseOverEvents(wordDiv, word);
      lineContainer.appendChild(wordDiv); // append each word to the current line
    });
    mainContainer.appendChild(lineContainer); // append each line to the main container
  });
};
