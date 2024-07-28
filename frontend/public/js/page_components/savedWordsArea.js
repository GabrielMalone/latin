
export const savedWordsAreaCreate = () => {

    const enterText = document.querySelector("#enterText");
    const notesContainer = document.querySelector("#notesContainer");
    const savedWordsArea = document.querySelector("#savedWordsArea");
    const bottomText = document.querySelector("#bottomText");
    const notesTextColorPassive = "#b7b7b7ac";

    savedWordsArea.addEventListener('click', () => {
        savedWordsArea.style.backgroundColor = '#0f1313';
        bottomText.innerHTML = "";
        savedWordsArea.style.zIndex = '3';
        notesContainer.style.zIndex = '2';
    });
    savedWordsArea.addEventListener('mouseleave', ()=> {
        enterText.style.color = notesTextColorPassive;
        savedWordsArea.style.backgroundColor = '#0c0f0f';
        if (savedWordsArea.innerText === ""){
            bottomText.innerHTML=`Double click a word to add its entry here`
        }
    });
    savedWordsArea.addEventListener('mouseenter', ()=> {
        enterText.style.color = notesTextColorPassive;
        savedWordsArea.style.backgroundColor = '#0f1313';
    });
}

// export const vocabAreaCreate = () => {
//     const vocabArea = document.querySelector("#savedWordsHere");
//     vocabArea.innerHTML = startingVocabValue;
// }