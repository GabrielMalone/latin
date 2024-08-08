import * as formatting from "./formatting.js";
import { createLatinTextArea } from "./mainTextArea.js";
import { createMenuDivs, createSubMenuDivs } from "./menus.js";
let firstload = true;
/**
 * Talk to backend, get word def in Latin from whitaker's compiled app
 * @param {*} word
 */
export const getDefinition = async (word) => {
  const assistanceArea = document.querySelector("#assistanceArea");
  word = word.toLowerCase();

  const localFetch = `http://localhost:8000/translate?word=${encodeURIComponent(
    word
  )}`;
  const deployedFetch = `https://latin-r3z3.onrender.com/translate?word=${encodeURIComponent(
    word
  )}`;

  try {
    const response = await fetch(deployedFetch, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const translation = await response.text();
    let coloredLines = formatting.colorCodeDefinition(translation); // colorize the output
    lookUpWord.innerHTML = `${word}`; // visual aid in look-up area
    assistanceArea.innerHTML = `<pre>${coloredLines.join("\n")}</pre>`; // place the whitaker's output into its div
  } catch (error) {
    assistanceArea.textContent = `${error.message}`;
  }
};

export const getLatinText = async (author, title) => {
  const localFetch = `http://localhost:8000/textfile`;
  const deployedFetch = `https://latin-r3z3.onrender.com/textfile`;
  // Construct the full fetch URL with query parameters for author and title
  let fetchURL = "";
  if (firstload) {
    fetchURL = `${deployedFetch}?author=${encodeURIComponent(
      "Ovid"
    )}&title=${encodeURIComponent("ovid.met Liber I")}`;
    textsMenu.innerHTML = `<div class="author, head" id="authorNameSelected">Authors</div>`;
    firstload = false;
  } else {
    fetchURL = `${deployedFetch}?author=${encodeURIComponent(
      author
    )}&title=${encodeURIComponent(title)}`;
  }
  const sourceArea = document.querySelector("#sourceArea");
  fetch(fetchURL)
    .then((response) => response.text())
    .then((data) => {
      let loadedText = data.trim();
      let newStringData = formatting.proseLineBreaks(loadedText);
      sourceArea.value = newStringData;
      createLatinTextArea();
      const inputBox = document.querySelector("#sourceArea");
      const firstSpace = inputBox.value.indexOf(" ");
      const firstWord = inputBox.value.substring(0, firstSpace);
      getDefinition(firstWord);
      sourceArea.value = "";
    })
    .catch((error) => {
      console.error("Error fetching text file:", error);
    });
};

export const createMenu = async () => {
  try {
    // Fetch the list of files from the server
    const response = await fetch("https://latin-r3z3.onrender.com/initnotes");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    data.forEach((item) => {
      if (!item.includes(".")) {
        let menuDiv = createMenuDivs(item);
        textsMenu.appendChild(menuDiv);
      }
    });
  } catch (error) {
    console.error("Error fetching files:", error);
  }
};

export const createWorksList = (author) => {
  fetch(`https://latin-r3z3.onrender.com/initnotes?author=${author}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      workSelect.innerHTML = ""; // Clear previous works
      data.forEach((item) => {
        let subMenuDiv = createSubMenuDivs(item);
        workSelect.appendChild(subMenuDiv);
      });
    })
    .catch((error) => console.error("Error fetching files:", error));
};
