//TODO SCRIPTS
//handles everything that has to do with note creation/ viewing, creates the id of the note in te db/ localstorage and also different effects
//
//outside exports

// import { } from "/static/js/consts.js";

//genrating a random hexadecimal number to save in the local storage in case user isnt logged in, we can also sync to firebase when the user logs in with this id
const randomHexGenerator = () =>
  Math.floor(Math.random() * 16777216)
    .toString(16)
    .padStart(6, "0");
// //a different nav bar version thats custom made for this page
// const editNav = $(/*html*/ `    
// <nav class="nav edit-nav" data-animation="animate-in-left-to-right">
//     <div class="nav-container nav-edit">
//         <input type="text" class="nav-container-title nav-container-input" id="note-name" value="New Note" />
//         <div class="nav-container-underline"></div>
//         <h1 class="nav-container-text">Choose a background for your note!</h1>
//     </div>
//     <div class="nav-slider" data-function="note-background">
//       <div class="nav-slider-track vertical" data-role="note-background">
//         <div class="nav-slider-track-item selected">
//           <img class="nav-slider-track-item-image" src="/static/assets/images/note-image-1.jpg" />
//           <span class="nav-slider-track-item-title">Quiet Nature</span>
//         </div>
//         <div class="nav-slider-track-item">
//           <img class="nav-slider-track-item-image" src="/static/assets/images/note-image-1.jpg" />
//           <span class="nav-slider-track-item-title">Quiet Nature</span>
//         </div>
//         <div class="nav-slider-track-item">
//           <img class="nav-slider-track-item-image" src="/static/assets/images/note-image-1.jpg" />
//           <span class="nav-slider-track-item-title">Quiet Nature</span>
//         </div>
//         <div class="nav-slider-track-item">
//           <img class="nav-slider-track-item-image" src="/static/assets/images/note-image-1.jpg" />
//           <span class="nav-slider-track-item-title">Quiet Nature</span>
//         </div>
//         <div class="nav-slider-track-item field">
//           <input type="file" accept="image/*" name="nav-slider-track-item-input" id="nav-slider-track-item-input"
//               class="nav-slider-track-item-input image-input" style="display: none;" />
//           <label for="nav-slider-track-item-input" class="nav-slider-track-item-title">Choose an Image</label>
//           <img src="/static/assets/images/default-profile-picture.jpg"  class="nav-slider-track-item-preview" id="nav-slider-track-item-preview">
//         </div>
//       </div>
//       <div class="nav-slider-controls vertical">
//         <i class="nav-slider-controls-control fa-solid fa-chevron-down" data-target="vertical" data-direction="+"></i>
//         <div class="nav-slider-controls-pagnation">
//           <div class="nav-slider-controls-pagnation-item selected"></div>
//           <div class="nav-slider-controls-pagnation-item"></div>
//           <div class="nav-slider-controls-pagnation-item"></div>
//           <div class="nav-slider-controls-pagnation-item"></div>
//           <div class="nav-slider-controls-pagnation-item"></div>
//         </div>
//         <i class="nav-slider-controls-control fa-solid fa-chevron-down" data-direction="-" data-target="vertical"></i>
//       </div>
//     </div>
//     <div class="nav-container nav-edit">
//       <h1 class="nav-container-text">Type of Pen:</h1>
//     </div>
//     <div class="nav-select" data-function="note-font">
//       <div class="nav-select-list active">
//           <div class="nav-select-list-item selected" value="ballpoint" title="Ballpoint Pen"><svg class="nav-select-list-item-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M15.891 3.047a3.578 3.578 0 1 1 5.061 5.06L20.061 9a3.25 3.25 0 0 1-.005 4.592l-1.784 1.783a.75.75 0 1 1-1.06-1.06l1.783-1.784A1.75 1.75 0 0 0 19 10.06l-9.998 10a3.106 3.106 0 0 1-1.477.825L2.924 21.98a.75.75 0 0 1-.904-.903l1.096-4.602c.133-.559.419-1.07.825-1.476l11.95-11.952Z"/></svg></div>
//           <div class="nav-select-list-item" value="pencil" title="Pencil"><svg  class="nav-select-list-item-icon"xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M20.131 3.16a3 3 0 0 0-4.242 0l-.707.708l4.95 4.95l.706-.707a3 3 0 0 0 0-4.243l-.707-.707Zm-1.414 7.072l-4.95-4.95l-9.09 9.091a1.5 1.5 0 0 0-.401.724l-1.029 4.455a1 1 0 0 0 1.2 1.2l4.456-1.028a1.5 1.5 0 0 0 .723-.401l9.091-9.091Z"/></g></svg></div>
//           <div class="nav-select-list-item" value="fountain" title="Fountain Pen"><svg class="nav-select-list-item-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-3 -3 24 24"><path fill="white" d="M8.406 12.732L5.367 9.693c.543-.956 1.335-1.903 2.375-2.838c1.341-1.208 3.708-3.25 7.1-6.126a1.795 1.795 0 0 1 2.53 2.53c-2.88 3.398-4.921 5.765-6.125 7.1c-.935 1.037-1.882 1.828-2.841 2.373zM3.99 11.146l2.965 2.964l-1.366 1.906l-5.276 1.795l1.771-5.3l1.906-1.365z"/></svg></div>
//           <div class="nav-select-list-item" value="marker" title="Marker"><svg class="nav-select-list-item-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="m15.95 2.39l5.657 5.657a1 1 0 0 1 0 1.414l-7.778 7.778l-2.122.707l-1.414 1.415a1 1 0 0 1-1.414 0l-4.243-4.243a1 1 0 0 1 0-1.414L6.05 12.29l.707-2.122l7.779-7.778a1 1 0 0 1 1.414 0Zm.707 3.536l-6.364 6.364l1.414 1.414l6.364-6.364l-1.414-1.414ZM4.283 16.886l2.828 2.828l-1.414 1.414l-4.243-1.414l2.829-2.828Z"/></svg></div>
//       </div>
//     </div>
//     <div class="nav-container nav-edit">
//       <h1 class="nav-container-text">Pen Color:</h1>
//     </div>
//     <div class="nav-select" data-function="note-color">
//       <div class="nav-select-list">
//         <div class="nav-select-list-item selected" value="black" title="Black"><div class="nav-select-list-item-icon" value="black"></div></div>
//         <div class="nav-select-list-item" value="red" title="Red"><div class="nav-select-list-item-icon" value="red"></div></div>
//         <div class="nav-select-list-item" value="green" title="Green"><div class="nav-select-list-item-icon" value="green"></div></div>
//         <div class="nav-select-list-item" value="blue" title="Blue"><div class="nav-select-list-item-icon" value="blue"></div></div>
//       </div>
//     </div>
//     <div class="nav-container nav-edit">
//       <h1 class="nav-container-text">Choose a Paper Background:</h1>
//     </div>
//     <div class="nav-slider horizontal" data-function="note-paper">
//     <div class="nav-slider-track horizontal" data-role="paper-background">
//       <div class="nav-slider-track-item selected pattern-1" data-pattern="pattern-1"></div>
//       <div class="nav-slider-track-item pattern-2" data-pattern="pattern-2"></div>
//       <div class="nav-slider-track-item pattern-3" data-pattern="pattern-3"></div>
//       <div class="nav-slider-track-item pattern-4" data-pattern="pattern-4"></div>
//       <div class="nav-slider-track-item field">
//         <input type="file" accept="image/*" name="nav-slider-track-item-input" id="nav-slider-track-item-input"
//             class="nav-slider-track-item-input" style="display: none;" />
//         <label for="nav-slider-track-item-input" class="nav-slider-track-item-title">Choose an Image</label>
//         <img src="/static/assets/images/default-profile-picture.jpg"  class="nav-slider-track-item-preview" id="nav-slider-track-item-preview">
//       </div>
//     </div>
//     <div class="nav-slider-controls horizontal">
//       <i class="nav-slider-controls-control fa-solid fa-chevron-right" data-direction="+" data-target="horizontal"></i>
//       <div class="nav-slider-controls-pagnation">
//         <div class="nav-slider-controls-pagnation-item selected"></div>
//         <div class="nav-slider-controls-pagnation-item"></div>
//         <div class="nav-slider-controls-pagnation-item"></div>
//       </div>
//       <i class="nav-slider-controls-control fa-solid fa-chevron-right" data-direction="-" data-target="horizontal"></i>
//       </div>
//     </div>
//     <div class="nav-settings nav-edit">
//         <h1 class="nav-settings-item nav-edit">
//             <i class="fi fi-rr-trash-xmark" id="note-delete"></i>
//             <i class="fi fi-rr-floppy-disk-circle-arrow-right"  id="note-save"></i>
//         </h1>
//     </div>
// </nav>
// `);
//the click function for the pen and color chooser
$(document).on("click", ".nav-select-list-item", function () {
  const s = $(this);
  const value = s.attr("value");
  const target = $(".note-area");
  const func = s.parent().parent().data("function");
  //makinfg the selected element the first
  s.siblings(".selected").removeClass("selected");
  s.addClass("selected");
  s.prependTo(s.parent());
  //and also applying the styles to the note-area
  target.attr(`data-${func}`, value);
});
//the slider function and animatings
const sliderInterface = {
  horizontal: {
    pagnationCounter: 0,
    targetValue: "margin-left",
    func: (target) => target.width(),
  },
  vertical: {
    pagnationCounter: 0,
    targetValue: "margin-top",
    func: (target) => target.height(),
  },
};
$(document).on("click", ".nav-slider-controls-control", function () {
  const s = $(this);
  const orientation = s.data("target");
  const target = $(`.${orientation} .nav-slider-track-item`).first();
  const direction = s.data("direction");
  let { pagnationCounter, targetValue, func } = sliderInterface[orientation];
  //returning early if the element is animating
  if (target.is(":animated")) {
    console.log("animatinggg");
    return;
  }
  //getting the existing value of the target
  const existingValue = parseFloat(target.css(targetValue).replace("px", ""));
  const value = func(target) + 4;
  const maxValue =
    value *
    ($(`.nav-slider-track.${orientation}`).children(".nav-slider-track-item")
      .length -
      1);

  //and finally executing
  if (
    !(direction == "+" && existingValue == 0) &&
    !(direction == "-" && existingValue == -maxValue)
  ) {
    const animationObject = {};
    animationObject[targetValue] =
      existingValue + parseFloat(direction + value) + "px";
    //
    target.animate(animationObject, 200);
    //also the selector
    pagnationCounter = pagnationCounter + parseInt(direction + 1) * -1;
    //and we should update the object with the new value for the pagnation counter
    sliderInterface[orientation].pagnationCounter = pagnationCounter;
    $(`.${orientation} .nav-slider-controls-pagnation-item`)
      .eq(pagnationCounter)
      .addClass("selected")
      .siblings()
      .removeClass("selected");
  }
});
//thes ehandles the note background and paper background changes
//the interface for the sliders
const sliderFuncInterface = {
  "paper-background": (pattern) => {
    $(".note-area").attr("data-pattern", pattern);
  },
  "note-background": (backgroundSrc) => {},
};
//the selector
$(document).on("click", ".nav-slider-track-item:not(.selected)", function () {
  const s = $(this);
  s.addClass("selected").siblings(".selected").removeClass("selected");
  const role = s.parent().data("role");
  const pattern = s.data("pattern");
  sliderFuncInterface[role](pattern);
});
$(document).on("click", "#note-save", async function () {
  //getting the values to save
  const noteName = $("#note-name").val();
  const noteValue = $("#note-value").val();
  //
  const noteLocation = window.globals.noteLocation;
  //
  const noteBackground = $(
    '.nav-slider[data-function="note-background"] .nav-slider-track-item.selected'
  );
  const notePaper = $(
    '.nav-slider[data-function="note-paper"] .nav-slider-track-item.selected'
  ).data("pattern");
  const noteColor = $(
    '.nav-select[data-function="note-color"] .nav-select-list-item.selected'
  ).attr("value");
  const noteFont = $(
    '.nav-select[data-function="note-font"] .nav-select-list-item.selected'
  ).attr("value");
  //
  const userId = window.globals.user.id;
  //
  const noteData = {
    noteConfigs: {
      noteColor: noteColor,
      noteFont: noteFont,
      noteBackground: noteBackground,
      notePaper: notePaper,
    },
    noteName: noteName,
    noteValue: noteValue,
    hashtagsArray: [],
  };
  if (userId) {
    noteData.user = userId;
    const docRef = doc(db, "notes");
    await setDoc(docRef, noteData);
    const docId = docRef.id;
    noteData.id = docId;
  } else {
    noteData.user = "local";
    noteData.id = randomHexGenerator();
  }
  //
  window.globals.user.info.folders.forEach(({name})=>{
    if(name.toLowerCase() == noteLocation.toLowerCase())
      this.push(noteData.id)
  })
  window.globals.notes[noteData.id] = noteData;
  //we also need to add this note id to the array of the notes 
});
//the hashtag functionality, adding the hashtags into the hashtag bar
const hashtagsReturner = (hashtag) =>
  `<span class="hashtags-list-item">#${hashtag}</span>`;
//the function that is meant to execute on the button click and enter press
const addNewHashtag = () => {
  const valueTarget = $("#hashtag-input");
  const value = valueTarget.val();
  const target = $(".hashtags-list");
  if (value) {
    valueTarget.val("");
    target.append(hashtagsReturner(value));
  }
};
//the click handler
$(document).on("click", "#add-hashtag", addNewHashtag);
//the enter keypress handler
$(document).on("keypress", "#hashtag-input", (e) => {
  if (e.which == 13) {
    addNewHashtag();
  }
});

