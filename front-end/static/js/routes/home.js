//HOME SCRIPTS
//handles the home nav-bar, the note generation and different effects in the home page like the add button and routing to the notes
//
//handling the style change in the nav-bar items
// ! the globals
const globals = window.globals;
$(document).on("click", ".nav-items-item:not(.disabled, .selected)", function () {
    const s = $(this);
    //
    globals.noteLocation = s.text().trim();
    s.siblings('.selected').removeClass("selected");
    s.addClass("selected");
    //updating the text in the little plus icon
    $("#add-note").text(s.text());
    // ! Don't forget to update the window.globals
    // * This will make sure to update the localStorage 
    window.globals = globals;
});
