import {
  getLatinText,
  createMenu,
  createWorksList,
} from "./fetchDefinition.js";

const notesTextColorActive = "antiquewhite";
const startingNotesValue = ``; // starting value for the notes area
const backgroundColor = "#0000000;"; // Ensure proper format
const notesTextColorPassive = "#000000;";

const enterText = document.querySelector("#enterText");
const workSelect = document.querySelector("#workSelect");
const textsMenu = document.querySelector("#textsMenu");
let staticMenu; // Placeholder for static menu clone

const notesContainer = document.querySelector("#notesContainer");
let currentAuthor = "";
let firstMouseOver = true;

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

  await createMenu(); // Wait for menu creation to complete
  worksDivSlider();
  authorMouseOver();

  // Clone after population
  staticMenu = textsMenu.cloneNode(true);
};

export const createMenuDivs = (data) => {
  const menuDiv = document.createElement("div");
  menuDiv.className = "author";
  menuDiv.textContent = data;
  menuClick(menuDiv);
  authorNameMouseOverHighlight(menuDiv);
  return menuDiv;
};

const menuClick = (menuDiv) => {
  menuDiv.addEventListener("click", () => {
    currentAuthor = menuDiv.textContent;
    createWorksList(currentAuthor);
    workSelect.style.height = "30%";
  });
};

export const createSubMenuDivs = (data) => {
  // Trim whitespace and replace .txt (case-insensitive)
  const cleanedData = data.trim().replace(/\.txt$/i, "");
  const subMenuDiv = document.createElement("div");
  subMenuDiv.className = "work";
  subMenuDiv.textContent = cleanedData;
  titleNameMouseOverHighlight(subMenuDiv);
  subMenuClick(subMenuDiv);
  return subMenuDiv;
};

const subMenuClick = (subMenuDiv) => {
  subMenuDiv.addEventListener("click", () => {
    const textWithoutExtension = subMenuDiv.textContent.replace(/\.txt$/, "");
    getLatinText(currentAuthor, textWithoutExtension);
  });
};

const worksDivSlider = () => {
  workSelect.addEventListener("mouseleave", () => {
    workSelect.style.height = "0%";
  });
};

const authorMouseOver = () => {
  textsMenu.addEventListener("mouseenter", () => {
    if (firstMouseOver) {
      textsMenu.style.height = "80%";
      firstMouseOver = false;
      return;
    }

    // Clear existing menu and append cloned nodes
    textsMenu.innerHTML = ""; // Clear current menu
    staticMenu.childNodes.forEach((node) => {
      const clonedNode = node.cloneNode(true);
      textsMenu.appendChild(clonedNode); // Append cloned nodes
    });

    reattachEventListeners(); // Reattach event listeners
    textsMenu.style.height = "80%";
  });

  textsMenu.addEventListener("mouseleave", () => {
    textsMenu.style.height = "3.055vw";
    textsMenu.innerHTML = `<div class="author" id="authorName">${currentAuthor}</div>`;
  });
};

textsMenu.addEventListener("mouseleave", () => {
  textsMenu.style.height = "3.055vw";
});

const reattachEventListeners = () => {
  // Reattach event listeners to the cloned nodes
  textsMenu.querySelectorAll(".author").forEach((div) => {
    menuClick(div);
    authorNameMouseOverHighlight(div);
  });
};

const authorNameMouseOverHighlight = (div) => {
  div.addEventListener("mouseover", (event) => {
    div.style.color = "#000000";
    div.style.backgroundColor = "#ff00f276";
  });
  div.addEventListener("mouseleave", (event) => {
    div.style.color = "rgba(255, 248, 220, 0.733)";
    div.style.backgroundColor = "transparent";
  });
};

const titleNameMouseOverHighlight = (div) => {
  div.addEventListener("mouseover", (event) => {
    div.style.color = "#000000";
    div.style.backgroundColor = "#ff00f276";
  });
  div.addEventListener("mouseleave", (event) => {
    div.style.color = "rgba(255, 248, 220, 0.733)";
    div.style.backgroundColor = "transparent";
  });
};
