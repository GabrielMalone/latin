
let firstTimeclicking = true;

/**
 * click to begin entering notes
 */
export const notesAreaCreate = () => {

    const notesTextColorActive = "#b7b7b7"; 
    const startingNotesValue = `<p>notes:<p>
    ` // starting value for the notes area
    const backgroundColor = "#080e0e00";
    const notesTextColorPassive = "#b7b7b7ac";
    const enterText = document.querySelector("#enterText");
    const notesArea = document.querySelector("#notesContainer");

    enterText.innerHTML = startingNotesValue;

    enterText.addEventListener('click', ()=> {
        if(firstTimeclicking){
            enterText.innerHTML = "";
        }
        firstTimeclicking = false;
    });
    enterText.addEventListener('mouseleave', ()=> {
        if (enterText.innerHTML === ""){
            enterText.value = startingNotesValue;
        }     
    });
    notesContainer.addEventListener('click', ()=> {
        notesContainer.style.backgroundColor = backgroundColor;
        enterText.style.color = notesTextColorActive;
    });

    notesContainer.addEventListener('mouseleave', ()=> {
        enterText.style.color = notesTextColorPassive;
        notesContainer.style.backgroundColor = backgroundColor;
    });

    notesContainer.addEventListener('mouseenter', ()=> {
        enterText.style.color = notesTextColorActive;
        notesContainer.style.backgroundColor = backgroundColor;
    });

}