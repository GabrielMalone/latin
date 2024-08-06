import { getLatinText } from "./fetchDefinition.js";

const notesTextColorActive = "antiquewhite";
const startingNotesValue = ``; // starting value for the notes area
const backgroundColor = "#0000000;"; // Ensure proper format with
const notesTextColorPassive = "#000000;";

const authorName = document.querySelector("#authorName");
const enterText = document.querySelector("#enterText");
const workSelect = document.querySelector("#workSelect");
const textsMenu = document.querySelector("#textsMenu");
const windowButton = document.querySelector("#windowButton");
const notesContainer = document.querySelector("#notesContainer"); // Ensure this is defined
let currentAuthor = "";
let currentStateofMenu = "";

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

  createMenu();
  worksDivSlider();
  authorMouseOver();
};

const createMenu = () => {
  // Fetch the list of files from the server
  fetch("http://localhost:8000/initnotes")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // Process the file list
      data.forEach((item) => {
        let menuDiv = createMenuDivs(item);
        textsMenu.appendChild(menuDiv);
      });
    })
    .catch((error) => console.error("Error fetching files:", error));
};

const createMenuDivs = (data) => {
  const menuDiv = document.createElement("div");
  menuDiv.className = "author";
  menuDiv.textContent = data;
  menuClick(menuDiv);
  authorNameMouseOverHighlight(menuDiv);
  return menuDiv;
};

const menuClick = (menuDiv) => {
  currentStateofMenu = workSelect.innerHTML;
  menuDiv.addEventListener("click", () => {
    currentAuthor = menuDiv.textContent;
    createWorksList(currentAuthor);
    workSelect.style.height = "30%";
  });
};

const createWorksList = (author) => {
  fetch(`http://localhost:8000/initnotes?author=${author}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // Process the file list
      workSelect.innerHTML = ""; // Clear previous works
      data.forEach((item) => {
        let subMenuDiv = createSubMenuDivs(item);
        workSelect.appendChild(subMenuDiv);
      });
    })
    .catch((error) => console.error("Error fetching files:", error));
};

const createSubMenuDivs = (data) => {
  // Log the original data for debugging
  // Trim whitespace and replace .txt (case-insensitive)
  const cleanedData = data.trim().replace(/\.txt$/i, "");
  // Log the cleaned data for debugging
  // Create the sub-menu div and set its properties
  const subMenuDiv = document.createElement("div");
  subMenuDiv.className = "work";
  subMenuDiv.textContent = cleanedData;
  titleNameMouseOverHighlight(subMenuDiv);
  // Attach the click event listener
  subMenuClick(subMenuDiv);
  return subMenuDiv;
};

const subMenuClick = (subMenuDiv) => {
  subMenuDiv.addEventListener("click", () => {
    // Remove the '.txt' extension from the textContent
    const textWithoutExtension = subMenuDiv.textContent.replace(/\.txt$/, "");
    // Call getLatinText with the modified text
    getLatinText(currentAuthor, textWithoutExtension);
  });
};

const worksDivSlider = () => {
  workSelect.addEventListener("mouseleave", () => {
    // Change mouseexit to mouseleave
    workSelect.style.height = "0%";
  });
};

const authorMouseOver = () => {
  textsMenu.addEventListener("mouseover", () => {
    textsMenu.style.height = "80%"; // Removed the extra semicolon
  });

  textsMenu.addEventListener("mouseleave", () => {
    textsMenu.style.height = "20%";
  });
};

textsMenu.addEventListener("mouseleave", () => {
  textsMenu.style.height = "20%";
});

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
