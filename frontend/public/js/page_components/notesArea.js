const enterText = document.querySelector("#enterText");

/**
 * click to begin entering notes
 */
export const notesAreaCreate = async () => {
  enterText.addEventListener("click", () => {});

  enterText.addEventListener("mouseleave", () => {
    enterText.style.color = "grey";
  });

  enterText.addEventListener("mouseenter", () => {
    enterText.style.color = "antiquewhite";
  });
};
