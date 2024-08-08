import {
  getLatinText,
  createWorksList,
  createMenu,
} from "./fetchDefinition.js";

const workSelect = document.querySelector("#workSelect");
const textsMenu = document.querySelector("#textsMenu");

let staticMenu; // Placeholder for static menu clone
let currentAuthor = "Authors";
let firstMouseOver = true;

export const createMenus = async () => {
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
      textsMenu.style.height = "100%";
      firstMouseOver = false;
      // Iterate over child nodes to find and remove the one with textContent 'Authors'
      textsMenu.childNodes.forEach((node) => {
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          node.textContent.trim() === "Authors"
        ) {
          textsMenu.removeChild(node);
        }
      });
      return;
    }
    // Clear existing menu and append cloned nodes
    textsMenu.innerHTML = ""; // Clear current menu
    staticMenu.childNodes.forEach((node) => {
      if (node.textContent.trim() !== "Authors") {
        const clonedNode = node.cloneNode(true);
        textsMenu.appendChild(clonedNode); // Append cloned nodes
      }
    });

    reattachEventListeners(); // Reattach event listeners
    textsMenu.style.height = "100%";
  });

  textsMenu.addEventListener("mouseleave", () => {
    textsMenu.style.height = "4.055vw";
    textsMenu.innerHTML = `<div class="author" id="authorNameSelected">${currentAuthor}</div>`;
  });
};

textsMenu.addEventListener("mouseleave", () => {
  textsMenu.style.height = "4.055vw";
});

const reattachEventListeners = () => {
  // Reattach event listeners to the cloned nodes
  textsMenu.querySelectorAll(".author").forEach((div) => {
    if (div.textContent != "Authors") {
      menuClick(div);
      authorNameMouseOverHighlight(div);
    }
  });
};

const authorNameMouseOverHighlight = (div) => {
  div.addEventListener("mouseover", (event) => {
    div.style.color = "#000000";
    div.style.backgroundColor = "#709c4b";
  });
  div.addEventListener("mouseleave", (event) => {
    div.style.color = "rgba(255, 248, 220, 0.733)";
    div.style.backgroundColor = "transparent";
  });
};

const titleNameMouseOverHighlight = (div) => {
  div.addEventListener("mouseover", (event) => {
    div.style.color = "#000000";
    div.style.backgroundColor = "#709c4b";
  });
  div.addEventListener("mouseleave", (event) => {
    div.style.color = "rgba(255, 248, 220, 0.733)";
    div.style.backgroundColor = "transparent";
  });
};
