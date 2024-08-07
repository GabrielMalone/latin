const backgroundColor = "#0000000;"; // Ensure proper format

const enterText = document.querySelector("#enterText");
const notesContainer = document.querySelector("#notesContainer");

/**
 * click to begin entering notes
 */
export const notesAreaCreate = async () => {
  enterText.innerHTML = startingNotesValue;

  enterText.addEventListener("click", () => {});

  enterText.addEventListener("mouseleave", () => {
    if (enterText.innerHTML === "") {
      enterText.innerHTML = startingNotesValue; // Use value if it's an input/textarea
    }
  });

  notesContainer.addEventListener("click", () => {});

  notesContainer.addEventListener("mouseleave", () => {
    enterText.style.color = "grey";
    notesContainer.style.backgroundColor = backgroundColor;
  });

  enterText.addEventListener("mouseenter", () => {
    enterText.style.color = "antiquewhite";
    notesContainer.style.backgroundColor = backgroundColor;
  });
};
