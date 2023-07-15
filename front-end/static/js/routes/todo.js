//TODO SCRIPTS
//handles everything that has to do with note creation/ viewing, creates the id of the note in te db/ localstorage and also different effects
//
//outside exports
import { randomHexGenerator } from "/static/js/consts.js";
//the globals
const globals = window.globals;

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
    targetValue: 'X',
    value: 50,
    isSliderAnimating: false,
  },
  vertical: {
    pagnationCounter: 0,
    targetValue: 'Y',
    value: 100,
    isSliderAnimating: false,
  },
};
$(document).on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', '.nav-slider-track', function(){
  const s = $(this);
  const direction = s.attr('class').replace('nav-slider-track','').trim();
  sliderInterface[direction].isSliderAnimating = false;
} )
$(document).on("click", ".nav-slider-controls-control", function () {
  const s = $(this);
  const orientation = s.data("target");
  const direction = s.data("direction");
  const target = $(`.nav-slider-track.${orientation}`);
  let { pagnationCounter, targetValue, value } = sliderInterface[orientation];
  //
  const existingValue = -pagnationCounter * value;
  const maxValue = (target.children(".nav-slider-track-item").length - 1) * value;
  if (
    !(direction == "-" && existingValue == 0) &&
    !(direction == "+" && existingValue == -maxValue)
  ) {
    pagnationCounter = pagnationCounter + parseInt(direction + 1);
    target.css('transform', `translate${targetValue}(calc(${existingValue - parseInt(`${direction}${value}`)}% - ${pagnationCounter * 4}px))`);
    // console.log(`calc(${existingValue - parseInt(`${direction}${value}`)}% - ${pagnationCounter * 4}px)`)
    sliderInterface[orientation].isSliderAnimating = true;
    //also the selector
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
  ).children('img').attr('src');
  const notePaper = $(
    '.nav-slider[data-function="note-paper"] .nav-slider-track-item.selected'
  ).data("pattern");
  const noteColor = $(
    '.nav-select[data-function="note-color"] .nav-select-list-item.selected'
  ).attr("value");
  const noteFont = $(
    '.nav-select[data-function="note-font"] .nav-select-list-item.selected'
  ).attr("value");
  const hashtags = $('.hashtags-list-item').text().split('#');
  hashtags.shift()
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
    hashtagsArray: hashtags,
    noteLocation: noteLocation,
  };
  console.log(noteData)
  if (userId) {
    console.log(`%cUser is logged in`, 'color:blue; background-color: white')
    noteData.user = userId;
    const id = $('.note').data('id');
    if(id) {
      //the note exists so we need to update it
    console.log(`%cThe note EXISTS`, 'color:blue; background-color: white')
      try{
        const docRef = doc(db, "notes", id);
        updateDoc(docRef, noteData);
      } catch (error) {
        console.error(error)
      }
    } else {
    console.log(`%cThe note DOESEN'T exist`, 'color:blue; background-color: white')
      //the note doesent exist
    //creating a docRef
    const docRef = doc(db, "notes");
    //setting this new dc in the firebase
    await setDoc(docRef, noteData);
    //getting that new id
    noteData.id  = docRef.id;
    //and setting the id to the note itself
    $('.note').data('id', docId)
    history.pushState(null, null, docRef.id);
    //
    window.globals.user.info.folders.every(({name, noteIds})=>{
      if(name.toLowerCase().trim() == noteLocation){
        noteIds.push(noteData.id);
        return false;
      }
      return true;
    })
    }
  } else {
    console.log(`%cUser is NOT logged in`, 'color:blue; background-color: white')
    noteData.user = "local";
    const id = $('.note').data('id');
    if(id) {
    console.log(`%cThe note EXISTS`, 'color:blue; background-color: white')
      //the note exists so we need to update it
      window.globals.user.info.folders.every( ({name, noteIds}) => {
        //we need to find in which folder the note belongs in
        if(name.toLowerCase().trim() == noteLocation.toLowerCase()){
        console.log(`%cLooping throught the folders`, 'color:green; background-color: black')
         noteIds.every( (noteId, i) => {
          if(noteId == id){
          console.log(`%cFound the ID assocciated with the note, updating the value`, 'color:green; background-color: black')
            noteIds[i] = noteData;
            return false;
          }
          return true;
         })
          return false;
        }
        return true;
      })
    } else {
    console.log(`%c The note DOESEN'T exist`, 'color:blue; background-color: white')
      //the note doesent exist
    console.log(`%cGenerating an Id`, 'color:green; background-color: black')
   const newNoteId = randomHexGenerator()
    $('.note').data('id', newNoteId)
    noteData.id = newNoteId;
    history.pushState(null, null, newNoteId);
    //
    window.globals.user.info.folders.every(({name, noteIds})=>{
      if(name.toLowerCase().trim() == noteLocation.toLowerCase()){
        console.log(`%cFound where the note belogs-${name}`, 'color:green; background-color: black')
        noteIds.push(noteData.id);
        return false;
      }
      return true;
      })
    window.globals.notes[newNoteId] = noteData;

    }
  }
  //
 
  // window.globals.notes[noteData.id] = noteData;
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

