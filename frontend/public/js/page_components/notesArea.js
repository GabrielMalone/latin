const notesTextColorActive = "antiquewhite";
const startingNotesValue = ``; // starting value for the notes area
const backgroundColor = "#0000000;"; // Ensure proper format
const notesTextColorPassive = "#000000;";

const enterText = document.querySelector("#enterText");
const notesContainer = document.querySelector("#notesContainer");

/**
 * click to begin entering notes
 */
export const notesAreaCreate = async () => {
  enterText.innerHTML = startingNotesValue;

  enterText.addEventListener("click", () => {
    if (enterText.innerHTML === startingNotesValue) {
      enterText.innerHTML = ""; // Use value if it's an input/textarea
    }
  });

  enterText.addEventListener("mouseleave", () => {
    if (enterText.innerHTML === "") {
      enterText.innerHTML = startingNotesValue; // Use value if it's an input/textarea
    }
  });

  notesContainer.addEventListener("click", () => {
    notesContainer.style.backgroundColor = backgroundColor;
    enterText.style.color = notesTextColorActive;
  });

  notesContainer.addEventListener("mouseleave", () => {
    enterText.style.color = notesTextColorPassive;
    notesContainer.style.backgroundColor = backgroundColor;
  });

  notesContainer.addEventListener("mouseenter", () => {
    enterText.style.color = notesTextColorActive;
    notesContainer.style.backgroundColor = backgroundColor;
  });
};
