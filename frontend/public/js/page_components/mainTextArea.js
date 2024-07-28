import {mouseOverEvents} from "./wordEvents.js"


// Listen for any change in the mainTExtArea
// Select the target node
const targetNode = document.getElementById('latinText');
// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };
// Create a callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {};
// Create an instance of MutationObserver and pass the callback function
const observer = new MutationObserver(callback);

/**
 * create the div container for each word
 */
const createWordDiv = (word) => {
    const wordDiv = document.createElement('div');
    wordDiv.className = 'word';
    wordDiv.textContent = word;
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