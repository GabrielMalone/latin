import * as formatting from "./formatting.js";
import { createLatinTextArea } from "./mainTextArea.js";
let firstload = true;
/**
 * Talk to backend, get word def in Latin from whitaker's compiled app
 * @param {*} word
 */
export const getDefinition = async (word) => {
  const assistanceArea = document.querySelector("#assistanceArea");
  word = word.toLowerCase();

  const localFetch = `http://localhost:8000/translate?word=${encodeURIComponent(
    word
  )}`;
  const deployedFetch = `https://latin-r3z3.onrender.com/translate?word=${encodeURIComponent(
    word
  )}`;

  try {
    const response = await fetch(deployedFetch, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const translation = await response.text();
    let coloredLines = formatting.colorCodeDefinition(translation); // colorize the output
    lookUpWord.innerHTML = `${word}`; // visual aid in look-up area
    assistanceArea.innerHTML = `<pre>${coloredLines.join("\n")}</pre>`; // place the whitaker's output into its div
  } catch (error) {
    assistanceArea.textContent = `${error.message}`;
  }
};

export const getLatinText = async (author, title) => {
  const localFetch = `http://localhost:8000/textfile`;
  const deployedFetch = `https://latin-r3z3.onrender.com/textfile`;
  // Construct the full fetch URL with query parameters for author and title
  let fetchURL = "";
  if (firstload) {
    fetchURL = `${deployedFetch}?author=${encodeURIComponent(
      "Ovid"
    )}&title=${encodeURIComponent("ovid.amor Liber I")}`;
    firstload = false;
  } else {
    fetchURL = `${deployedFetch}?author=${encodeURIComponent(
      author
    )}&title=${encodeURIComponent(title)}`;
  }
  const sourceArea = document.querySelector("#sourceArea");
  fetch(fetchURL)
    .then((response) => response.text())
    .then((data) => {
      console.log("Text file contents:", data);
      let loadedText = data.trim();
      let newStringData = formatting.proseLineBreaks(loadedText);
      sourceArea.value = newStringData;
      createLatinTextArea();
      const inputBox = document.querySelector("#sourceArea");
      const firstSpace = inputBox.value.indexOf(" ");
      const firstWord = inputBox.value.substring(0, firstSpace);
      getDefinition(firstWord);
      console.log(firstSpace);
      sourceArea.value = "";
    })
    .catch((error) => {
      console.error("Error fetching text file:", error);
    });
};
