import { createLatinTextArea } from "./page_components/mainTextArea.js";
import { notesAreaCreate } from "./page_components/notesArea.js";
import { sourceAreaCreate } from "./page_components/sourceArea.js";
import {
  getDefinition,
  getLatinText,
} from "./page_components/fetchDefinition.js";

const latinTextArea = document.getElementById("latinText");
// remove any highlights when mouse leaves the latin passage
latinTextArea.addEventListener("mouseleave", () => {
  document.querySelector(".word.highlight")?.classList.remove("highlight");
});
notesAreaCreate();
sourceAreaCreate();
// set default value for source material
window.addEventListener("load", function () {
  console.log("Page fully loaded");
  const inputBox = this.document.querySelector("#sourceArea");
  const textArea = this.document.querySelector("#enterText");
  const firstSpace = inputBox.value.indexOf(" ");
  const firstWord = inputBox.value.substring(0, firstSpace);
  getLatinText();
  getDefinition(firstWord);
  textArea.focus();
});
