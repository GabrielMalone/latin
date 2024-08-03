/**
 * click to begin entering notes
 */
export const notesAreaCreate = () => {
  const notesTextColorActive = "antiquewhite";
  const startingNotesValue = ``; // starting value for the notes area
  const backgroundColor = "0d1338";
  const notesTextColorPassive = "rgba(250, 235, 215, 0.518)";
  const enterText = document.querySelector("#enterText");

  enterText.innerHTML = startingNotesValue;

  enterText.addEventListener("click", () => {
    if (enterText.innerHTML === startingNotesValue) {
      enterText.innerHTML = "";
    }
  });
  enterText.addEventListener("mouseleave", () => {
    if (enterText.innerHTML === "") {
      enterText.value = startingNotesValue;
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
