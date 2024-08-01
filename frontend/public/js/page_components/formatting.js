const lineBreakLengthForProseInput = 50;
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
            if (!line.includes('*')){
                return `<span style="color: ${whitaerOutputColor};">${line}</span>`; // off-white color
            }
        }
    });
    return styledLines;
}

/**
 * takes out specific morphological info for putting defintions into notes area
 * @param {*} currentDefinition 
 * @returns 
 */
export const stripDefinitionData = (currentDefinition) => {
    const lines = currentDefinition.split('\n');
    const notesDefinition = lines
      .filter(line => {
          const includesColor = line.includes(`<span style="color: #fefded;">`);
          const noCapitalLetters = !/[A-Z]/.test(line);
          const doesNotContainAsterisk = !line.includes('*');
          const isNotEmpty = line.trim() !== ''; 
          const shouldInclude = (includesColor || noCapitalLetters) && doesNotContainAsterisk && isNotEmpty;
          return shouldInclude;
      })
    return notesDefinition.join('\n');
}

/**
 * This function will break the prose into line lengths that fit the UI and , hopefully ,  maintian original poetry breaks.
 * @param {*} sourceArea 
 * @returns 
 */
export const proseLineBreaks = (pastedText) => {
    let newStringData = "";
    let count = 0;
    let index = 0;
    while (index < pastedText.length) {
        let currentChar = pastedText[index];
        let nextChr = pastedText[index + 1];
        if (currentChar >= '0' && currentChar <= '9'){
            // index ++;
            // continue;
        }
        if ((currentChar.charCodeAt(0) === 32 && nextChr?.charCodeAt(0) !== 32 && count >= lineBreakLengthForProseInput) || (currentChar === '\n')) {
            newStringData += "\n";
            count = 0;
        } else {
            newStringData += currentChar;
            count++;
        }
        index++;
    }
    return newStringData;
}

/**
 * Keep only a-z chars before sending a word to whitaker's. will need to update this to handle macrons. 
 * @param {*} word 
 * @returns 
 */
export const cleanword = (word) => {
    const macronMap = {
        'ā': 'a',
        'ē': 'e',
        'ī': 'i',
        'ō': 'o',
        'ū': 'u',
        'Ā': 'A',
        'Ē': 'E',
        'Ī': 'I',
        'Ō': 'O',
        'Ū': 'U'
    };
    let cleanword = "";
    for (let i = 0; i < word.length; i++) {
        let char = word.charAt(i);
        if (macronMap[char]) {
            char = macronMap[char];
        }
        if (char.toLowerCase() >= 'a' && char.toLowerCase() <= 'z') {
            cleanword += char;
        }
    }
    return cleanword;
}