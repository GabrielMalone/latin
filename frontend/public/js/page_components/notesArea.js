
/**
 * click to begin entering notes
 */
export const notesAreaCreate = () => {

    const notesTextColorActive = "#b7b7b7"; 
    const startingNotesValue = `Enter notes/Translation...` // starting value for the notes area

    const notesTextColorPassive = "#b7b7b7ac";
    const sourceTextColorPassive = "#68686b";

    const sourceArea = document.querySelector("#sourceArea");
    const enterText = document.querySelector("#enterText");

    enterText.value = startingNotesValue;

    enterText.addEventListener('click', ()=> {
        if(enterText.value === startingNotesValue || enterText.value === startingNotesValue){
            enterText.value = "";
        }
    });

    enterText.addEventListener('mouseleave', ()=> {
        if (enterText.value === ""){
            enterText.value = startingNotesValue;
        }     
    });

    enterText.addEventListener('dblclick', () => {
        if (enterText.value === startingNotesValue|| enterText.value === startingNotesValue){
            enterText.value="";
        }
        enterText.classList = ''
    });

    notesContainer.addEventListener('click', ()=> {
        notesContainer.style.zIndex = '3';
        notesContainer.style.backgroundColor = '#080e0eea';
        sourceArea.style.color = sourceTextColorPassive;
        enterText.style.color = notesTextColorActive;

    });

    notesContainer.addEventListener('mouseleave', ()=> {
        enterText.style.color = notesTextColorPassive;
        notesContainer.style.backgroundColor = '#080e0eea';
    });

    notesContainer.addEventListener('mouseenter', ()=> {
        enterText.style.color = notesTextColorActive;
        notesContainer.style.backgroundColor = '#080e0eea';
    });

}