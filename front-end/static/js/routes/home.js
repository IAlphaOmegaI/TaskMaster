//HOME SCRIPTS
//handles the home nav-bar, the note generation and different effects in the home page like the add button and routing to the notes
//
//handling the style change in the nav-bar items
// ! the globals
const globals = window.globals;
$(document).on("click", ".nav-items-item:not(.disabled, .selected)", function (event) {
  event.stopPropagation();
    const s = $(this);
    const target = s.text().trim();
    const container = $('.notes-container');
    //
    globals.noteLocation = target.trim();
    s.siblings(".selected").removeClass("selected");
    s.addClass("selected");
    //updating the text in the little plus icon
    $("#add-note").text(s.text());
    //dealing with the notes and hashtags
    $(`.note:not([data-for="${target}"])`).addClass('disabled');
    $(`.note[data-for="${target}"]`).removeClass('disabled');
    //
    $(`.hashtag:not([data-for="${target}"], .disabled, .view-all)`).addClass('disabled');
    $(`.hashtag[data-for="${target}"]`).removeClass('disabled');
    //
    // console.log('Updating the packery layout...')
    container.packery()
    container.packery('reloadItems');
    container.packery('layout');
   
    // ! Don't forget to update the window.globals
    // * This will make sure to update the localStorage
    window.globals = globals;
});
//the hashtag selector
$(document).on("click", ".hashtag:not(.active)", function () {
  const s = $(this);
  const container = $('.notes-container');
  //
  s.siblings(".active").removeClass("active");
  s.addClass("active");
  const target = s.text().trim();
//dealing with the notes and hashtags
if(!s.hasClass('view-all')){
    console.log(target)
    $('.note').each((i, note) => {
        note = $(note);
        const dataArr = note.data('hashtags').split(',');
        console.log(dataArr)
        dataArr.includes(target) ? note.removeClass('disabled') : note.addClass('disabled')
    });
} else 
    $(`.note[data-for="${window.globals.noteLocation}"]`).removeClass('disabled')

container.packery()
container.packery('reloadItems');
container.packery('layout');

});
