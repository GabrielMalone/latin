import { createLatinTextArea } from "./mainTextArea.js";
import { cleanword, proseLineBreaks } from "./formatting.js";
import { getDefinition } from "./fetchDefinition.js";

let isPasting = false;
export const sourceAreaCreate = () => {
  const startingLatinValue = `In nova fert animus mutatas dicere formas
corpora; di, coeptis (nam vos mutastis et illas)
adspirate meis primaque ab origine mundi
ad mea perpetuum deducite tempora carmen!
Ante mare et terras et quod tegit omnia caelum `; // starting passage for the website

  const inputBackgroundColor = "#193434";

  const sourceMaterialArea = document.querySelector("#sourceMaterialArea");
  const sourceArea = document.querySelector("#sourceArea");
  const mainContainer = document.getElementById("latinText");
  const inputLabel = document.getElementById("inputLabel");

  // default page load text
  sourceArea.value = startingLatinValue;

  sourceArea.addEventListener("click", () => {
    sourceArea.value = "";
  });

  sourceArea.addEventListener("keydown", (event) => {
    mainContainer.innerHTML = "";
    let wordArray = sourceArea.value.split(/\s+/);
    if (sourceArea === "") {
      wordArray = [];
    }
    if (event.key === "Enter" || event.key === " ") {
      createLatinTextArea();
      getDefinition(cleanword(wordArray[wordArray.length - 1]));
      if (event.key === "Enter") {
        sourceArea.value = "";
      }
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
    sourceArea.style.backgroundColor = "#2f105b";
    sourceArea.style.color = "#4e5757";
  });
  sourceMaterialArea.addEventListener("mouseenter", () => {
    sourceArea.style.backgroundColor = "#481d83";
    sourceArea.style.color = "#FEFDED";
  });
};
