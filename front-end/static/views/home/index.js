const noteThumbnailReturner = ( { noteBackground }, noteName, noteId, noteLocation) => /*html*/`
<div class="note" data-id="${noteId}" data-link href="/todo/${noteId}" data-for="${noteLocation}">
  <span class="note-title">${noteName}</span>
  <img class="note-background" src="${noteBackground}"/>
  <div class="note-go">
    <i class="fa-solid fa-arrow-right note-go-icon"></i>
  </div>
</div>
`
const hashtagsReturner = (hashtag, location) => `<span class="hashtag" data-for="${location}">#${hashtag}</span>`;

const homeReturner = (notesArray, hashtagsArray) => /*html*/`
<div id="app-contents" data-animation="animate-in-bottom-to-top">
    <div class="hashtags">
      ${hashtagsArray.map(({hashtagLocation, hashtag}) => hashtagsReturner(hashtag, hashtagLocation))}
    </div>
    <div class="notes">
        ${notesArray.map(({noteConfigs, noteValue, noteName, id, noteLocation}) => noteThumbnailReturner(noteConfigs, noteName, id, noteLocation))}
    </div>
    <div class="add" data-link href="/todo/new-note">
        <i class="fi fi-sr-add-document add-icon"></i>
        <h1 class="add-title">Add something to <span class="add-title-folder" id="add-note">Notes</span></h1>
    </div>
</div>
`
export default homeReturner;