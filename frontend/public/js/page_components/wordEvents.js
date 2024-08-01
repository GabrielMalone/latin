import { cleanword, stripDefinitionData } from "./formatting.js";
import { getDefinition } from "./fetchDefinition.js";
const vocabListArray = []; // keep track of the words in the vocablist area
let count = 1;
/**
 * All events related to a highlighted word go here
 * @param {*} wordDiv 
 * @param {*} word 
 */
export const mouseOverEvents = (wordDiv, word, count) => {
    wordDiv.setAttribute('tabindex', '0');  
    wordDiv.addEventListener('mouseover', () => { 
        generalHighlighter(wordDiv);                                           
        word = cleanword(word);
        getDefinition(word);
        keyDownVerb(wordDiv); 
        keyDownSubject(wordDiv);
        keyDownAcc(wordDiv);
        keyDownSpace(wordDiv);
        keyDownPrep(wordDiv);
        keyDownAbl(wordDiv);
        keyDownDat(wordDiv);
        keyDownGen(wordDiv);
        clickWordReset(wordDiv);
        doubleClickWord(wordDiv);
        wordDiv.focus();     
    });
}

/**
 * double clicking a word adds the word to the vocabulary list , if not already present. 
 * @param {*} wordDiv 
 */
export const doubleClickWord = (wordDiv) => {
    wordDiv.addEventListener('dblclick', () => {
        const currentDefinition = assistanceArea.innerHTML;
        // dont add multiples to the vocab list 
        let hasWord = vocabListArray.some(definition => definition === currentDefinition);
        if (!hasWord) {
            vocabListArray.push(currentDefinition);
            let notesDefinition = stripDefinitionData(currentDefinition);
            // strip data here.
            document.querySelector("#enterText").insertAdjacentHTML("beforeend", `${count} - ${notesDefinition}<div class="notes-horizontal-line"></div>`);
            count ++;
        }
    });
}

// ----- FUNCTIONS FOR MARKING UP WORDS ------ // 

/**
 * highlight a word with any mouseover
 */
export const generalHighlighter = (wordDiv) => {
    const highlightedWord = document.querySelector('.word.highlight');
    if (highlightedWord) {
        highlightedWord.classList.remove('highlight');
    }
    wordDiv.classList.add('highlight'); 
}

/**
 * key events for highlighting subjects
 * @param {*} wordDiv 
 */
export const keyDownSubject = (wordDiv) => {
    wordDiv.addEventListener('keydown', (event) => { 
        if (event.key === 's'){
            subjectHighlighter(wordDiv);
        }
    });  
}

/**
 * highlight subjects
 * @param {*} wordDiv 
 */
export const subjectHighlighter = (wordDiv) => {
    wordDiv.classList = "word";
    wordDiv.classList.add('subject'); 
}

/**
 * highlights verbs with V keystroke
 * @param {*} wordDiv 
 */
export const keyDownVerb = (wordDiv) => {
    wordDiv.addEventListener('keydown', (event) => { 
        if (event.key === 'v'){
            verbHighlighter(wordDiv);
        }
    });  
}

/**
 * highlight a verb
 * @param {*} wordDiv 
 */
export const verbHighlighter = (wordDiv) => {
    wordDiv.classList = "word";
    wordDiv.classList.add('verb'); 
}

/**
 * highlights accusative with 'a' keystroke
 * @param {*} wordDiv 
 */
export const keyDownAcc = (wordDiv) => {
    wordDiv.addEventListener('keydown', (event) => { 
        if (event.key === 'a'){
            accHighlighter(wordDiv);
        }
    });  
}

/**
 * highlight an accusative
 * @param {*} wordDiv 
 */
export const accHighlighter = (wordDiv) => {
    wordDiv.classList = "word";
    wordDiv.classList.add('accusative'); 
}

/**
 * highlights prepositions with P keystroke
 * @param {*} wordDiv 
 */
export const keyDownPrep = (wordDiv) => {
    wordDiv.addEventListener('keydown', (event) => { 
        if (event.key === 'p'){
            prepHighlighter(wordDiv);
        }
    });  
}

/**
 * highlight a preposition
 * @param {*} wordDiv 
 */
export const prepHighlighter = (wordDiv) => {
    wordDiv.classList = "word";
    wordDiv.classList.add('preposition'); 
}

/**
 * ablative highlighter
 * @param {*} wordDiv 
 */
export const keyDownAbl = (wordDiv) => {
    wordDiv.addEventListener('keydown', (event) => { 
        if (event.key === 'b'){
            console.log('b hit!');
            ablHighlighter(wordDiv);
        }
    });  
}
/**
 * highlight an ablative
 * @param {*} wordDiv 
 */
export const ablHighlighter = (wordDiv) => {
    wordDiv.classList = "word";
    wordDiv.classList.add('ablative'); 
    console.log('highlight ablative!');
}

/**
 * dative highlighter
 * @param {*} wordDiv 
 */
export const keyDownDat = (wordDiv) => {
    wordDiv.addEventListener('keydown', (event) => { 
        if (event.key === 'd'){
            datHighlighter(wordDiv);
        }
    });  
}
/**
 * highlight a dative
 * @param {*} wordDiv 
 */
export const datHighlighter = (wordDiv) => {
    wordDiv.classList = "word";
    wordDiv.classList.add('dative'); 
}

/**
 * genitive highlighter
 * @param {*} wordDiv 
 */
export const keyDownGen = (wordDiv) => {
    wordDiv.addEventListener('keydown', (event) => { 
        if (event.key === 'g'){
            genHighlighter(wordDiv);
        }
    });  
}
/**
 * highlight a genitive
 * @param {*} wordDiv 
 */
export const genHighlighter = (wordDiv) => {
    wordDiv.classList = "word";
    wordDiv.classList.add('genitive'); 
}


/**
 * clears the current marked up words
 * @param {*} wordDiv 
 */
export const keyDownSpace = (wordDiv) => {
    wordDiv.addEventListener('keydown', (event) => { 
        if (event.code === 'Space'){
            // clear all highlights
            const markedUpWords = document.querySelectorAll(".word");
            markedUpWords.forEach(word => {
                word.className = 'word';
            });
        }
    });  
}

/**
 * clicking a word resets any markups
 * @param {*} wordDiv 
 */
export const clickWordReset = (wordDiv) => {
    wordDiv.addEventListener('click', () => {
        wordDiv.className = 'word';
    });
}