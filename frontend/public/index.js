import { createLatinTextArea, sourceAreaCreate, cardShuffleAbility, notesAreaCreate } from "./helpers.js";

const latinTextArea = document.getElementById('latinText');

// remove any highlights when mouse leaves the latin passage
latinTextArea.addEventListener('mouseleave', () => {
    document.querySelector(".word.highlight")?.classList.remove('highlight');
})
// add event listeners everywhere on build 
notesAreaCreate();
sourceAreaCreate();
cardShuffleAbility();
createLatinTextArea();
window.addEventListener("load", function() {
    console.log("Page fully loaded");
    this.document.querySelector("#sourceArea").value = "Enter a word or source material...";
});
