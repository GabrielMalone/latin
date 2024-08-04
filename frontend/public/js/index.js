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
// set default value for source material
window.addEventListener("load", function () {
  console.log("Page fully loaded");
  notesAreaCreate();
  sourceAreaCreate();
  getLatinText();
  this.document.querySelector("#enterText").focus();
});
