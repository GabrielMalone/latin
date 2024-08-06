import { cleanword, stripDefinitionData } from "./formatting.js";
import { getDefinition } from "./fetchDefinition.js";

const vocabListArray = []; // keep track of the words in the vocablist area
let count = 1;
let wordPair = [];

/**
 * All events related to a highlighted word go here
 * @param {*} wordDiv
 * @param {*} word
 */
export const mouseOverEvents = (wordDiv, word) => {
  wordDiv.setAttribute("tabindex", "0");

  // Check if event listeners have been set up to avoid duplicates
  if (!wordDiv.classList.contains("event-setup")) {
    wordDiv.addEventListener("mouseover", (event) => {
      event.preventDefault();

      generalHighlighter(wordDiv);
      word = cleanword(word);
      getDefinition(word);
      // setTimeout(() => wordDiv.focus(), 0); // Ensure focus is set
    });
    doubleClickWord(wordDiv);
    keyDownVerb(wordDiv);
    keyDownSubject(wordDiv);
    keyDownAcc(wordDiv);
    keyDownSpace(wordDiv);
    keyDownPrep(wordDiv);
    keyDownAbl(wordDiv);
    keyDownDat(wordDiv);
    keyDownGen(wordDiv);
    joinWord(wordDiv);
    clickWordReset(wordDiv);
    typeWordReset(wordDiv);
    // Mark that events are set up to avoid re-adding them
    wordDiv.classList.add("event-setup");
  }
};

/**
 * double clicking a word adds the word to the vocabulary list , if not already present.
 * @param {*} wordDiv
 */
export const doubleClickWord = (wordDiv) => {
  wordDiv.addEventListener("dblclick", () => {
    const currentDefinition = assistanceArea.innerHTML;
    // dont add multiples to the vocab list
    let hasWord = vocabListArray.some(
      (definition) => definition === currentDefinition
    );
    if (!hasWord) {
      vocabListArray.push(currentDefinition);
      let notesDefinition = stripDefinitionData(currentDefinition);
      // strip data here.
      document
        .querySelector("#enterText")
        .insertAdjacentHTML(
          "beforeend",
          `${count} - ${notesDefinition}<div class="notes-horizontal-line"></div>`
        );
      count++;
    }
  });
};

// ----- KEY EVENTS METHODS -------------------------------------------- //

export const joinWord = (wordDiv) => {
  const latinTextArea = document.querySelector("#latinText");

  wordDiv.addEventListener("keydown", (event) => {
    if (event.key === "j") {
      if (wordPair.length < 2) {
        wordPair.push(wordDiv);
        wordDiv.classList.add("linked-pair");
        console.log(wordPair);
      } else if (wordPair.length >= 2) {
        wordPair[1].classList.remove("linked-pair");
        wordPair.pop();
        wordPair.push(wordDiv);
        wordDiv.classList.add("linked-pair");
        console.log(wordPair);
      }
      if (wordPair.length === 2) {
        const div1 = wordPair[0];
        const div2 = wordPair[1];
        const line = document.getElementById("svgLine");

        const rect1 = div1.getBoundingClientRect();
        const rect2 = div2.getBoundingClientRect();

        const x1 = rect1.left + window.scrollX + rect1.width / 1.5;
        const y1 = rect1.top + window.scrollY + rect1.height / 1.5;
        const x2 = rect2.left + window.scrollX + rect2.width / 1.5;
        const y2 = rect2.top + window.scrollY + rect2.height / 1.5;

        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
      }
    }
  });
};

/**
 * highlight a word with any mouseover
 */
export const generalHighlighter = (wordDiv) => {
  const highlightedWord = document.querySelector(".word.highlight");
  if (highlightedWord) {
    highlightedWord.classList.remove("highlight");
  }
  wordDiv.classList.add("highlight");
};

/**
 * key events for highlighting subjects
 * @param {*} wordDiv
 */
export const keyDownSubject = (wordDiv) => {
  wordDiv.addEventListener("keydown", (event) => {
    if (event.key === "s") {
      subjectHighlighter(wordDiv);
      // addNominativeSupercript(wordDiv);
    }
  });
};

/**
 * highlight subjects
 * @param {*} wordDiv
 */
export const subjectHighlighter = (wordDiv) => {
  wordDiv.classList = "word";
  wordDiv.classList.add("color", "subject");
  wordDiv.classList.remove("blinking");
};

/**
 * highlights verbs with V keystroke
 * @param {*} wordDiv
 */
export const keyDownVerb = (wordDiv) => {
  wordDiv.addEventListener("keydown", (event) => {
    event.preventDefault();
    if (event.key === "v") {
      verbHighlighter(wordDiv);
      // addVerbSupercript(wordDiv);
    }
  });
};

/**
 * highlight a verb
 * @param {*} wordDiv
 */
export const verbHighlighter = (wordDiv) => {
  wordDiv.classList = "word";
  wordDiv.classList.add("color", "verb");
  wordDiv.classList.remove("blinking");
};

/**
 * highlights accusative with 'a' keystroke
 * @param {*} wordDiv
 */
export const keyDownAcc = (wordDiv) => {
  wordDiv.addEventListener("keydown", (event) => {
    if (event.key === "a") {
      accHighlighter(wordDiv);
    }
  });
};

/**
 * highlight an accusative
 * @param {*} wordDiv
 */
export const accHighlighter = (wordDiv) => {
  wordDiv.classList = "word";
  wordDiv.classList.add("color", "accusative");
  wordDiv.classList.remove("blinking");
};

/**
 * highlights prepositions with P keystroke
 * @param {*} wordDiv
 */
export const keyDownPrep = (wordDiv) => {
  wordDiv.addEventListener("keydown", (event) => {
    if (event.key === "p") {
      prepHighlighter(wordDiv);
    }
  });
};

/**
 * highlight a preposition
 * @param {*} wordDiv
 */
export const prepHighlighter = (wordDiv) => {
  wordDiv.classList = "word";
  wordDiv.classList.add("color", "preposition");
  wordDiv.classList.remove("blinking");
};

/**
 * ablative highlighter
 * @param {*} wordDiv
 */
export const keyDownAbl = (wordDiv) => {
  wordDiv.addEventListener("keydown", (event) => {
    if (event.key === "b") {
      ablHighlighter(wordDiv);
    }
  });
};
/**
 * highlight an ablative
 * @param {*} wordDiv
 */
export const ablHighlighter = (wordDiv) => {
  wordDiv.classList = "word";
  wordDiv.classList.add("color", "ablative");
  wordDiv.classList.remove("blinking");
};

/**
 * dative highlighter
 * @param {*} wordDiv
 */
export const keyDownDat = (wordDiv) => {
  wordDiv.addEventListener("keydown", (event) => {
    if (event.key === "d") {
      datHighlighter(wordDiv);
    }
  });
};
/**
 * highlight a dative
 * @param {*} wordDiv
 */
export const datHighlighter = (wordDiv) => {
  wordDiv.classList = "word";
  wordDiv.classList.add("color", "dative");
  wordDiv.classList.remove("blinking");
};

/**
 * genitive highlighter
 * @param {*} wordDiv
 */
export const keyDownGen = (wordDiv) => {
  wordDiv.addEventListener("keydown", (event) => {
    if (event.key === "g") {
      genHighlighter(wordDiv);
    }
  });
};
/**
 * highlight a genitive
 * @param {*} wordDiv
 */
export const genHighlighter = (wordDiv) => {
  wordDiv.classList = "word";
  wordDiv.classList.add("color", "genitive");
  wordDiv.classList.remove("blinking");
};

/**
 * clears the current marked up words
 * @param {*} wordDiv
 */
export const keyDownSpace = (wordDiv) => {
  wordDiv.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      // clear all highlights
      const markedUpWords = document.querySelectorAll(".word");
      const superscriptedWords = document.querySelectorAll(".superscript");
      markedUpWords.forEach((word) => {
        word.className = "word";
      });
      superscriptedWords.forEach((word) => {
        word.remove();
      });
    }
  });
};

/**
 * clicking a word resets any markups
 * @param {*} wordDiv
 */
export const clickWordReset = (wordDiv) => {
  wordDiv.addEventListener("click", () => {
    if (wordDiv.classList.contains("blinking")) {
      wordDiv.classList.remove("blinking");
      return;
    }
    if (wordDiv.classList.contains("color")) {
      wordDiv.classList.remove("color");
    }
    generalHighlighter(wordDiv);
    const allBlinking = document.querySelectorAll(".blinking");
    allBlinking.forEach((blinker) => {
      blinker.className = "word";
    });
    wordDiv.classList.add("blinking");
  });
};

/**
 * clears the current marked up word
 * @param {*} wordDiv
 */
export const typeWordReset = (wordDiv) => {
  wordDiv.addEventListener("keydown", (event) => {
    if (event.key === "c") {
      event.preventDefault();
      wordDiv.className = "word";
    }
  });
};

// ---------- SUPERSCRIPT METHODS ------------------------------------------//

// const addVerbSupercript = (wordDiv) => {
//     if (! wordDiv.querySelector('.superscript')){
//         wordDiv.classList.add('superscripted');
//         wordDiv.insertAdjacentHTML('afterbegin', `<div class="superscript">verb ${verbs_marked.length}</div>`)
//     }
//     else {
//         wordDiv.removeChild(wordDiv.querySelector('.superscript'));
//     }
// }

// const addNominativeSupercript = (wordDiv) => {
//     if (! wordDiv.querySelector('.superscript')){
//         wordDiv.classList.add('superscripted');
//         wordDiv.insertAdjacentHTML('afterbegin', `<div class="superscript">nom</div>`);
//     }
//     else {
//         wordDiv.removeChild(wordDiv.querySelector('.superscript'));
//     }
// }
