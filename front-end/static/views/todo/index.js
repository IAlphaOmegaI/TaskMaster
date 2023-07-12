//the hashtag functionality, adding the hashtags into the hashtag bar
const hashtagsReturner = (hashtag) => `<span class="hashtags-list-item">#${hashtag}</span>`;

const todoReturner = (noteValue, {noteColor, noteFont, noteBackground}, hashtagsArray) => /*html*/`  
    <div id="app-contents" data-animation="animate-in-bottom-to-top">
        <div class="hashtags">
            <div class="hashtags-field">
                <input type="text" class="hashtags-field-input" name="hashtag" id="hashtag-input">
                <i class="fi fi-rr-redo hashtags-field-icon" id="add-hashtag"></i>
            </div>
            <div class="hashtags-list">
                ${hashtagsArray.map( hashtag => hashtagsReturner(hashtag)).join('')}
            </div>
        </div>
        <div class="note">
            <textarea class="note-area" data-pattern="${noteBackground}" data-note-color="${noteColor}" 
            data-note-font="${noteFont}" id="note-value" value="${noteValue}"></textarea>
        </div>
    </div>
`;
export default todoReturner;