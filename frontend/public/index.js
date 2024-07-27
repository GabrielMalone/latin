import { createLatinTextArea, sourceAreaCreate, cardShuffleAbility, notesAreaCreate } from "./helpers.js";

const latinTextArea = document.getElementById('latinText');

// remove any highlights when mouse leaves the latin passage
latinTextArea.addEventListener('mouseleave', () => {
    document.querySelector(".word.highlight")?.classList.remove('highlight');
})

notesAreaCreate();
sourceAreaCreate();
cardShuffleAbility();
createLatinTextArea();

