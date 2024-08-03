import { createLatinTextArea } from "./page_components/mainTextArea.js";
import { notesAreaCreate } from "./page_components/notesArea.js";
import { sourceAreaCreate } from "./page_components/sourceArea.js";
import { getDefinition } from "./page_components/fetchDefinition.js";

const latinTextArea = document.getElementById("latinText");
// remove any highlights when mouse leaves the latin passage
latinTextArea.addEventListener("mouseleave", () => {
  document.querySelector(".word.highlight")?.classList.remove("highlight");
});

// build the page
notesAreaCreate();
sourceAreaCreate();
createLatinTextArea();

// set default value for source material
window.addEventListener("load", function () {
  console.log("Page fully loaded");
  const inputBox = this.document.querySelector("#sourceArea");
  const textArea = this.document.querySelector("#enterText");
  const firstSpace = inputBox.value.indexOf(" ");
  const firstWord = inputBox.value.substring(0, firstSpace);
  getDefinition(firstWord);
  inputBox.value =
      "Enter a word/paste source material to replace the passage below";
  textArea.focus();
});
