//HOME SCRIPTS
//handles the home nav-bar, the note generation and different effects in the home page like the add button and routing to the notes
//
//handling the style change in the nav-bar items

$(".nav-items-item:not(.disabled)").on("click", function () {
    const s = $(this);
    if(s.hasClass('selected')){
        return;
    }
    s.siblings('.selected').removeClass("selected");
    s.addClass("selected");
    $("#add-note").text(s.text());
});