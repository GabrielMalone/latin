


const vocabListArray = [];
const startingNotesValue = `Enter notes/Translation...`
const startingLatinValue = `In nova fert animus mutatas dicere formas
corpora; di, coeptis (nam vos mutastis et illas)
adspirate meis primaque ab origine mundi
ad mea perpetuum deducite tempora carmen!
Ante mare et terras et quod tegit omnia caelum `;


// FORMATTING RELATED METHODS BELOW -----------------------------------------

const colorCodeDefinition = (translation) => {
    // Split the translation into lines
    const lines = translation.split('\n');
    const styledLines = lines.map(line => {
        if (line.includes('[') && line.includes(']')) {
            // Style for lines containing brackets
            return `<span style="color: #59b3eb;">${line}</span>`; // blueish color
        } else {
            // Default style for other lines
            return `<span style="color: #fefdeda8;">${line}</span>`; // off-white color
        }
    });
    return styledLines;
}

const checkForNewLineData = (sourceArea) => {
    let newLinePresent = false;
    for (let i  = 0 ; i  < sourceArea.value.length ; i ++ ){
        let currentChar = sourceArea.value[i];
        if (currentChar === "\n"){
            newLinePresent = true;
        }
    }
    return newLinePresent;
}
const proseLineBreaks = (sourceArea) => {
    let newStringData = "";
    let index = 0;
    for (let i  = 0 ; i  < sourceArea.value.length ; i ++ ){
        let currentChar = sourceArea.value[i];
        console.log(currentChar);
        if (currentChar === " " && index >= 35){
            newStringData += "\n";
            index = 0;
            index ++;
            continue;
        }
        newStringData += currentChar;
        index ++;
    }
    return newStringData;
}
/**
 * Keep only a-z chars
 * @param {*} word 
 * @returns 
 */
export const cleanword = (word) => {
    let cleanword = "";
    for (let i  = 0 ; i < word.length ; i ++){
        if (word.charAt(i).toLowerCase() >= 'a' && word.charAt(i).toLowerCase() <= 'z'){
            cleanword += word.charAt(i);
        }
    }
    return cleanword;
}

// DEFINITION RELATED METHODS BELOW -----------------------------------------
/**
 * Talk to python, get word def in Latin
 * @param {*} word 
 */
export const getDefinition = async (word) => {
    word = word.toLowerCase();
    try {
        const response = await fetch(`https://latin-r3z3.onrender.com/translate?word=${encodeURIComponent(word)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const translation = await response.text();
        let coloredLines = colorCodeDefinition(translation);
        lookUpWord.innerHTML = `${word}`;
        assistanceArea.innerHTML = `<pre>${coloredLines.join('\n')}</pre>`;
    } catch (error) {
        assistanceArea.textContent = `${error.message}`;
    }
}

//  MOUSE EVENTS BELOW ---------------------------------------------------------------

// Listen for any change in the mainTExtArea
// Select the target node
const targetNode = document.getElementById('latinText');
// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };
// Create a callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
    for(const mutation of mutationsList) {
        if (targetNode.innerText===""){
            console.log('im empyty!!');
            targetNode.innerText =`Input a word/s or paste in source material`;
        }
    }
};


// Create an instance of MutationObserver and pass the callback function
const observer = new MutationObserver(callback);

/**
 * All events related to a highlighted word go here
 * @param {*} wordDiv 
 * @param {*} word 
 */
export const mouseOverEvents = (wordDiv, word) => {

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
        clickWordReset(wordDiv);
        doubleClickWord(wordDiv);

        wordDiv.focus();     
    });
}

export const doubleClickWord = (wordDiv) => {
    wordDiv.addEventListener('dblclick', () => {
        const currentDefinition = assistanceArea.innerHTML;
        // dont add multiples to the vocab list 
        let hasWord = vocabListArray.some(definition => definition === currentDefinition);
        if (!hasWord) {
            vocabListArray.push(currentDefinition);
            savedWordsHere.insertAdjacentHTML("afterbegin", `<p><pre>${currentDefinition}</pre></p>`);
        }
        document.querySelector("#savedWordsArea").classList = 'z-index-top';
        document.querySelector("#notesContainer").classList = 'z-index-bottom';
        document.querySelector("#bottomText").innerHTML = "";
    });
}
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
    //const highlightedWord = document.querySelector('.word.verb');
    wordDiv.classList.add('verb'); 
}
/**
 * highlights verbs with V keystroke
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
 * highlight a verb
 * @param {*} wordDiv 
 */
export const accHighlighter = (wordDiv) => {
    // const highlightedWord = document.querySelector('.word.accusative');
    // if (highlightedWord) {
    //     highlightedWord.classList.remove('accusative');
    // }
    wordDiv.classList.add('accusative'); 
}
/**
 * highlights verbs with V keystroke
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
 * highlight a verb
 * @param {*} wordDiv 
 */
export const prepHighlighter = (wordDiv) => {
    // const highlightedWord = document.querySelector('.word.accusative');
    // if (highlightedWord) {
    //     highlightedWord.classList.remove('accusative');
    // }
    wordDiv.classList.add('preposition'); 
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
        wordDiv.className = ('word');
    });
}
export const vocabAreaCreate = () => {
    const vocabArea = document.querySelector("#savedWordsHere");
    vocabArea.innerHTML = startingVocabValue;
}
/**
 * click to begin entering notes
 */
export const notesAreaCreate = () => {
    const enterText = document.querySelector("#enterText");
    enterText.value = startingNotesValue;
    enterText.addEventListener('click', ()=> {
        if(enterText.value === startingNotesValue || enterText.value === "Enter notes/Translation..."){
            enterText.value = "";
        }
    });
    enterText.addEventListener('mouseleave', ()=> {
        if (enterText.value === ""){
            enterText.value = "Enter notes/Translation...";
        }     
    });
    enterText.addEventListener('dblclick', () => {
        if (enterText.value === "Enter notes/Translation..." || enterText.value === startingNotesValue){
            enterText.value="";
        }
        enterText.classList = ''
    });
}
/**
 * click to begin entering notes
 */
export const sourceAreaCreate = () => {
    const sourceArea = document.querySelector("#sourceArea");
    const mainContainer = document.getElementById('latinText'); 
    // default page load text
    sourceArea.value = startingLatinValue;

    sourceArea.addEventListener('mouseenter', ()=> {
        if (sourceArea.value === ""){
            sourceArea.value = "Enter a word or source material...";
        }
        sourceArea.style.color = "#FFFFFF";
    });
    sourceArea.addEventListener('click', ()=> {
        if (sourceArea.value === "Enter a word or source material...")
        sourceArea.value = "";
    });
    sourceArea.addEventListener('mouseleave', ()=> {
        if (sourceArea.value === ""){
            sourceArea.value = "Enter a word or source material...";
        }     
    });
    sourceArea.addEventListener('keydown', (event) => {
        if (event.code==="Space" || event.key==="Enter" || event.key === "Backspace"){
            console.log('delete pressed!');
            mainContainer.innerHTML = "";
            createLatinTextArea();
            // always look up the last word typed
            let wordArray = sourceArea.value.split(/[\s\n]+/);
            if (sourceArea === ""){
                wordArray = [];
            }
            getDefinition(cleanword(wordArray[wordArray.length-1]));
        } 
    });
    sourceArea.addEventListener('paste', event => {
        event.preventDefault();
       
        sourceArea.value = event.clipboardData.getData('text');
     
        mainContainer.innerHTML = "";

        // if no new-line data, add new line every 35 spaces or so(or the nearest space chracter)
        let newLinePresent = checkForNewLineData(sourceArea);
        // if no new line, make new string
        if (! newLinePresent){
            // index will be resetting for multiple lines so need this in addition to 'i'
            let newStringData = proseLineBreaks(sourceArea);
            // set the sourcevalue to this new string
            sourceArea.value = newStringData;
        }
        createLatinTextArea();
    })
}
/**
 * double click to shuffle card position
 */
export const cardShuffleAbility = () => {
    const sourceArea = document.querySelector("#sourceArea");
    const enterText = document.querySelector("#enterText");
    const notesContainer = document.querySelector("#notesContainer");
    const sourceMaterialArea = document.querySelector("#sourceMaterialArea");
    const savedWordsArea = document.querySelector("#savedWordsArea");
    const bottomText = document.querySelector("#bottomText");
    const notesTextColorActive="#b7b7b7";
    const notesTextColorPassive = "#b7b7b7";
    const sourceTextColorActive = "#b7b7b7";
    const sourceTextColorPassive = "#68686b";
    // const vocabNotesColorActive;
    // const vocabNotesColorPassive;

    //set default position
    sourceMaterialArea.classList = 'z-index-top';

    notesContainer.addEventListener('click', ()=> {
        notesContainer.style.zIndex = '3';
        sourceArea.style.color = sourceTextColorPassive;
        enterText.style.color = notesTextColorActive;

    });
    notesContainer.addEventListener('mouseleave', ()=> {
        enterText.style.color = notesTextColorPassive;
    });
    notesContainer.addEventListener('mouseenter', ()=> {
        enterText.style.color = notesTextColorActive;
    });
    sourceMaterialArea.addEventListener('click', ()=> {
        sourceArea.style.color = sourceTextColorActive;
        enterText.style.color = notesTextColorPassive;
    });
    sourceMaterialArea.addEventListener('mouseleave', ()=> {
        sourceArea.style.color = sourceTextColorPassive;
    });
    savedWordsArea.addEventListener('click', () => {
        console.log('you clicked here!');
        savedWordsArea.style.backgroundColor = '#21242a';
        bottomText.innerHTML = "";
        savedWordsArea.style.zIndex = '3';
        notesContainer.style.zIndex = '2';
    });
    savedWordsArea.addEventListener('mouseleave', ()=> {
        enterText.style.color = notesTextColorPassive;
        savedWordsArea.style.backgroundColor = '#0a1111';
        if (savedWordsArea.innerText === ""){
            bottomText.innerHTML=`Double click a word to add its entry here`
        }
    });
    savedWordsArea.addEventListener('mouseenter', ()=> {
        enterText.style.color = notesTextColorPassive;
        savedWordsArea.style.backgroundColor = '#21242a';
    });
}
  

//  MOUSE EVENTS ABOVE-----------------------------------------------------------------------


// MAIN CREATION OF LATIN TEXT AREA METHODS BELOW -------------------------------------------

/**
 * create the div container for each word
 */
export const createWordDiv = (word) => {
    const wordDiv = document.createElement('div');
    wordDiv.className = 'word';
    wordDiv.textContent = word;
    //backgroundLoadDefinitions(word);
    return wordDiv;
}

/**
 * create interactable the Latin text area
 */
export const createLatinTextArea = async () => {
    let data = document.querySelector("#sourceArea").value; 
    const mainContainer = document.getElementById('latinText');             // outtermost container of the Latin text
    observer.observe(targetNode, config);
    const lines = data.split("\n");
    lines.forEach(line => {                                                 // create a div for each line of text
        const lineContainer = document.createElement('div');
        lineContainer.className = 'line-container';
        const words = line.split(' ');                                      // put words into their own divs and into their correct div-line
        words.forEach(word => {     
            let wordDiv = createWordDiv(word);
            mouseOverEvents(wordDiv, word);
            lineContainer.appendChild(wordDiv);                             // append each word to the current line
        });
        mainContainer.appendChild(lineContainer);                           // append each line to the main container
    });
}