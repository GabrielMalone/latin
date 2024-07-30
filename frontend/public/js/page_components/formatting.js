const lineBreakLengthForProseInput = 40;
const whitakerOutputColoredLine = '#fefded'; // currently a light blue color
const whitaerOutputColor = `#fefdeda8`; // currently off-white

/**
 * This takes the output from whitaker's and color codes the line with the morphological forms a different color than the rest of the lines
 * @param {*} translation 
 * @returns 
 */
export const colorCodeDefinition = (translation) => {
    // Split the translation into lines
    const lines = translation.split('\n');
    const styledLines = lines.map(line => {
        if (line.includes('[') && line.includes(']')) {
            // Style for lines containing brackets
            
            const firstBracket = line.indexOf('[');
            const secondBracket = line.indexOf(']') + 1;
            const stringBefore = line.substring(0,firstBracket);
            const stringAfter = line.substring(secondBracket);

            return `<span style="color: ${whitakerOutputColoredLine};">${stringBefore}${stringAfter}</span>`; // blueish color
        } else {
            // Default style for other lines
            return `<span style="color: ${whitaerOutputColor};">${line}</span>`; // off-white color
        }
    });
    return styledLines;
}

/**
 * This function is if a user pastes in any prose. 
 * @param {*} sourceArea 
 * @returns 
 */
export const checkForNewLineData = (sourceArea) => {
    let newLinePresent = false;
    // const brRegex = /<br\s*\/?>/i; // This regex handles <br>, <br/>, <br /> with case insensitivity
    // // for (let i  = 0 ; i  < sourceArea.value.length ; i ++ ){
    // //     let currentChar = sourceArea.value[i];
    // //     if (currentChar === "\n"){
    // //         newLinePresent = true;
    // //     }
    // // }
    // if (sourceArea.innerText.includes('\n') || brRegex.test(sourceArea.innerText)){
    //     newLinePresent = true;
    //     console.log('new line data present');
    // }
    // return newLinePresent;
}

/**
 * This function will break the prose into line lengths that fit the UI.
 * @param {*} sourceArea 
 * @returns 
 */
export const proseLineBreaks = (sourceArea) => {
    let newStringData = "";
    let index = 0;
    let currentLine = "";

    for (let i = 0; i < sourceArea.innerText.length; i++) {
        let currentChar = sourceArea.innerText[i];
        currentLine += currentChar;
        index++;
        // Check if the current line exceeds the specified length and the current character is a space
        if (index >= lineBreakLengthForProseInput && currentChar === " ") {
            newStringData += currentLine.trim() + "\n";
            currentLine = "";
            index = 0;
        }
    }

    // Add any remaining part of the string
    if (currentLine.length > 0) {
        newStringData += currentLine;
    }

    return newStringData;
}

/**
 * Keep only a-z chars before sending a word to whitaker's. will need to update this to handle macrons. 
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