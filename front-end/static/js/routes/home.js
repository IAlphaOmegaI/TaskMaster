//HOME SCRIPTS
//handles the home nav-bar, the note generation and different effects in the home page like the add button and routing to the notes
//
//handling the style change in the nav-bar items
// ! the globals
const globals = window.globals;
$(document).on("click", ".nav-items-item:not(.disabled, .selected)", function () {
    const s = $(this);
    const target = s.text();
    //
    globals.noteLocation = target.trim();
    s.siblings(".selected").removeClass("selected");
    s.addClass("selected");
    //updating the text in the little plus icon
    $("#add-note").text(s.text());
    //dealing with the notes and hashtags
    $(`.note:not([data-for="${target}"], .disabled)`).addClass('disabled');
    $(`.note[data-for="${target}"]`).removeClass('disabled');
    //
    $(`.hashtag:not([data-for="${target}"], .disabled, .view-all)`).addClass('disabled');
    $(`.hashtag[data-for="${target}"]`).removeClass('disabled');
    // ! Don't forget to update the window.globals
    // * This will make sure to update the localStorage
    window.globals = globals;
  }
);
//the hashtag selector
$(document).on("click", ".hashtag", function () {
  const s = $(this);
  s.siblings(".active").removeClass("active");
  s.addClass("active");
  const target = s.text();
//dealing with the notes and hashtags
if(!s.hasClass('view-all')){
    $(`.note:not(.disabled)`).each((i, note) => {
        note = $(note);
        const dataArr = note.data('hashtags').split(',');
        dataArr.includes(target) ? note.removeClass('disabled') : note.addClass('disabled')
    });
} else 
    $(`note[data-for="${window.globals.noteLocation}"]`).removeClass('disabled')

$(`.note[data-for="${target}"]`).removeClass('disabled');
});
