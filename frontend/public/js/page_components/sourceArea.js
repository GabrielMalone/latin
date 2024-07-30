import { createLatinTextArea } from "./mainTextArea.js";
import { cleanword, proseLineBreaks, checkForNewLineData } from "./formatting.js";
import { getDefinition } from "./fetchDefinition.js";

let isPasting = false;
let hitSpaceKey = new KeyboardEvent('keydown', {
    key: ' ',
    code: 'Space',
    keyCode: 32, // Deprecated, but still needed for some browsers
    charCode: 32, // Deprecated, but still needed for some browsers
    which: 32, // Deprecated, but still needed for some browsers
    bubbles: true, // Whether the event bubbles up through the DOM or not
    cancelable: true
});

export const sourceAreaCreate = () => {

    const sourceAreaDefaultValue = 'Enter a word/s or paste in source material';

    const startingLatinValue = `In nova fert animus mutatas dicere formas
corpora; di, coeptis (nam vos mutastis et illas)
adspirate meis primaque ab origine mundi
ad mea perpetuum deducite tempora carmen!
Ante mare et terras et quod tegit omnia caelum `; // starting passage for the website 

    const sourceTextColorPassive = "#68686b";
    const sourceTextColorActive = "#8a8a8c";
    const notesTextColorPassive = "#b7b7b7ac";

    const sourceMaterialArea = document.querySelector("#sourceMaterialArea");
    const sourceArea = document.querySelector("#sourceArea");
    const mainContainer = document.getElementById('latinText'); 

    // default page load text
    sourceArea.value = startingLatinValue;

    sourceArea.addEventListener('mouseenter', ()=> {
        if (sourceArea.value === ""){
            sourceArea.value = sourceAreaDefaultValue;
        }
        sourceArea.style.color = sourceTextColorActive;
    });

    sourceArea.addEventListener('click', ()=> {
        sourceArea.value = "";
        hitSpaceKey(); 
    });

    sourceArea.addEventListener('mouseleave', ()=> {
        if (sourceArea.value === ""){
            sourceArea.value = sourceAreaDefaultValue;
        }     
    });

    sourceArea.addEventListener('keydown', (event) => {
            mainContainer.innerHTML = "";
            createLatinTextArea();
            let wordArray = sourceArea.value.split(/[\s\n]+/);
            if (sourceArea === ""){
                wordArray = [];
            }
          getDefinition(cleanword(wordArray[wordArray.length-1]));
    });
   sourceArea.addEventListener('keyup', (event) => {
            mainContainer.innerHTML = "";
            if (isPasting) {
                isPasting = false;
                return; // Ignore keyup events triggered by pasting
            }
            createLatinTextArea();
            // always look up the last word typed
            let wordArray = sourceArea.value.split(/[\s\n]+/);
            if (sourceArea === ""){
                wordArray = [];
            }
          getDefinition(cleanword(wordArray[wordArray.length-1])); 
    });

    sourceArea.addEventListener('paste', event => {
        isPasting = true;
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
        hitSpaceKey(); // just to make sure the the next function triggers
        hitSpaceKey();  
        createLatinTextArea();
        sourceArea.value = sourceAreaDefaultValue;
    })

     sourceMaterialArea.addEventListener('click', ()=> {
         sourceArea.style.color = sourceTextColorActive;
         enterText.style.color = notesTextColorPassive;
         sourceArea.value = ""; 
     });

     sourceMaterialArea.addEventListener('mouseleave', ()=> {
         sourceArea.style.color = sourceTextColorPassive;
     });
}