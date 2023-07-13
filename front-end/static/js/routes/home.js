//HOME SCRIPTS
//handles the home nav-bar, the note generation and different effects in the home page like the add button and routing to the notes
//
//handling the style change in the nav-bar items
//
$(document).on("click", ".nav-items-item:not(.disabled, .selected)", function () {
    const s = $(this);
    //
    window.globals.noteLocation = s.text().toLowerCase().trim();
    s.siblings('.selected').removeClass("selected");
    s.addClass("selected");
    $("#add-note").text(s.text());
});