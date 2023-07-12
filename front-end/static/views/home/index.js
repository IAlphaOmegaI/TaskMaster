const noteThumbnailReturner = ( { noteBackground }, noteName, noteId) => /*html*/`
<div class="note" data-id="${noteId}" data-link href="/todo/${noteId}">
  <span class="note-title">${noteName}</span>
  <img class="note-background" src="${noteBackground}"/>
  <div class="note-go">
    <i class="fa-solid fa-arrow-right note-go-icon"></i>
  </div>
</div>
`
const homeReturner = notesArray => /*html*/`
<div id="app-contents" data-animation="animate-in-bottom-to-top">
    <div class="notes">
        ${notesArray.map(({noteConfigs, noteValue, noteName, noteId}) => noteThumbnailReturner(noteConfigs, noteName, noteId))}
    </div>
    <div class="add" data-link href="/todo/new-note">
        <i class="fi fi-sr-add-document add-icon"></i>
        <h1 class="add-title">Add something to <span class="add-title-folder" id="add-note">Notes</span></h1>
    </div>
</div>
`
export default homeReturner;