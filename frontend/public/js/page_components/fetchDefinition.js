
import * as formatting from './formatting.js';

/**
 * Talk to backend, get word def in Latin from whitaker's compiled app
 * @param {*} word 
 */
export const getDefinition = async (word) => {
    word = word.toLowerCase();

    const localFetch = `http://localhost:8000/translate?word=${encodeURIComponent(word)}`;
    const deployedFetch = `https://latin-r3z3.onrender.com/translate?word=${encodeURIComponent(word)}`;

    try {
        const response = await fetch(deployedFetch, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const translation = await response.text();
        let coloredLines = formatting.colorCodeDefinition(translation);  // colorize the output
        lookUpWord.innerHTML = `${word}`; // visual aid in look-up area
        assistanceArea.innerHTML = `<pre>${coloredLines.join('\n')}</pre>`; // place the whitaker's output into its div

    } catch (error) {
        assistanceArea.textContent = `${error.message}`;
    }
}