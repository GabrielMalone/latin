import { createLatinTextArea } from "./mainTextArea.js";
import { cleanword, proseLineBreaks } from "./formatting.js";
import { getDefinition, getLatinText } from "./fetchDefinition.js";

let startingLatinValue = "";

let isPasting = false;

const sourceMaterialArea = document.querySelector("#sourceMaterialArea");
const sourceArea = document.querySelector("#sourceArea");
const mainContainer = document.getElementById("latinText");

export const sourceAreaCreate = () => {
  sourceArea.addEventListener("keydown", (event) => {
    mainContainer.innerHTML = "";
    let wordArray = sourceArea.value.split(/\s+/);
    if (sourceArea === "") {
      wordArray = [];
    }
    if (event.key === "Enter" || event.key === " ") {
      createLatinTextArea();
      getDefinition(cleanword(wordArray[wordArray.length - 1]));
    }
  });

  sourceArea.addEventListener("paste", (event) => {
    // need a way to strip all html data aside form newline data
    isPasting = true;
    event.preventDefault();
    let pastedText = event.clipboardData.getData("text/plain");
    mainContainer.innerHTML = "";
    // if no new-line data, add new line every 35 spaces or so(or the nearest space chracter)
    // index will be resetting for multiple lines so need this in addition to 'i'
    let newStringData = proseLineBreaks(pastedText);
    // set the sourcevalue to this new string
    sourceArea.value = newStringData;
    createLatinTextArea();
    sourceArea.value = "";
  });

  sourceMaterialArea.addEventListener("click", () => {
    sourceArea.value = "";
  });

  sourceMaterialArea.addEventListener("mouseleave", () => {
    sourceArea.style.backgroundColor = "#272430";
    sourceArea.style.color = "#4e5757";
  });
  sourceMaterialArea.addEventListener("mouseenter", () => {
    sourceArea.style.backgroundColor = "#272430";
    sourceArea.style.color = "#FEFDED";
  });
};
